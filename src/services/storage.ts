import { S3Client, PutObjectCommand, GetObjectCommand, ListObjectsCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';

interface StorageConfig {
  accountId: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucketName: string;
}

export class StorageService {
  private s3Client: S3Client;
  private bucketName: string;

  constructor() {
    const config: StorageConfig = {
      accountId: process.env.CLOUDFLARE_ACCOUNT_ID || '',
      accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY || '',
      bucketName: process.env.CLOUDFLARE_BUCKET_NAME || 'chat-sessions'
    };

    this.s3Client = new S3Client({
      region: 'auto',
      endpoint: `https://${config.accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
      forcePathStyle: true
    });

    this.bucketName = config.bucketName;
    
  }

  async saveSession(session: any): Promise<string> {
    try {
      const sessionId = `session_${Date.now()}`;
      const sessionData = {
        ...session,
        id: sessionId
      };


      const params = {
        Bucket: this.bucketName,
        Key: `${sessionId}.json`,
        Body: JSON.stringify(sessionData, null, 2),
        ContentType: 'application/json'
      };

      const command = new PutObjectCommand(params);
      await this.s3Client.send(command);
      return sessionId;
    } catch (error) {
      console.error('Error saving session to R2:', error);
      if (error.message) console.error('Error message:', error.message);
      if (error.$metadata) console.error('Error metadata:', error.$metadata);
      throw error;
    }
  }

  async getSession(sessionId: string): Promise<any> {
    try {

      const params = {
        Bucket: this.bucketName,
        Key: `${sessionId}.json`
      };

      const command = new GetObjectCommand(params);
      const response = await this.s3Client.send(command);
      const sessionData = await response.Body?.transformToString();
      
      if (!sessionData) {
        throw new Error('Session not found');
      }

      return JSON.parse(sessionData);
    } catch (error) {
      console.error('Error fetching session from R2:', error);
      if (error.$metadata) console.error('Error metadata:', error.$metadata);
      throw new Error('Session not found');
    }
  }

  async getAllSessions(): Promise<any[]> {
    try {
      const command = new ListObjectsV2Command({
        Bucket: this.bucketName,
        MaxKeys: 10 // Limit to 10 sessions
      });
      
      const response = await this.s3Client.send(command);
      const sessions = await Promise.all(
        (response.Contents || []).map(async (obj) => {
          if (!obj.Key) return null;
          return this.getSession(obj.Key.replace('.json', ''));
        })
      );
      
      return sessions
        .filter(Boolean)
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    } catch (error) {
      console.error('Error getting all sessions:', error);
      throw error;
    }
  }

  async getSessionsPage(startAfter?: string): Promise<{ sessions: any[]; hasMore: boolean }> {
    try {
      const command = new ListObjectsV2Command({
        Bucket: this.bucketName,
        MaxKeys: 10,
        StartAfter: startAfter
      });
      
      const response = await this.s3Client.send(command);
      const sessions = await Promise.all(
        (response.Contents || []).map(async (obj) => {
          if (!obj.Key) return null;
          return this.getSession(obj.Key.replace('.json', ''));
        })
      );
      
      const validSessions = sessions
        .filter(Boolean)
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

      return {
        sessions: validSessions,
        hasMore: response.IsTruncated || false
      };
    } catch (error) {
      console.error('Error getting sessions page:', error);
      throw error;
    }
  }
} 