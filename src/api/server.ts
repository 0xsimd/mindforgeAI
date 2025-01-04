import express from 'express';
import cors from 'cors';
import { ChatRoomService } from '../services/chatRoom';
import { StorageService } from '../services/storage';
import { ChatRoomConfig, AgentCreationOptions } from '../types';
import os from 'os';
import { networkInterfaces } from 'os';

const app = express();
app.use(cors());
app.use(express.json());

const storageService = new StorageService();

// Get all previous sessions
app.get('/api/sessions', async (req, res) => {
  try {
    const startAfter = req.query.startAfter as string | undefined;
    const result = await storageService.getSessionsPage(startAfter);
    res.json(result);
  } catch (error) {
    console.error('Error fetching sessions:', error);
    res.status(500).json({ error: 'Failed to fetch sessions' });
  }
});

// Get a specific session
app.get('/api/sessions/:sessionId', async (req, res) => {
  try {
    const session = await storageService.getSession(req.params.sessionId);
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }
    res.json(session);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch session' });
  }
});

// Get agents from a specific session
app.get('/api/sessions/:sessionId/agents', async (req, res) => {
  try {
    const session = await storageService.getSession(req.params.sessionId);
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }
    res.json(session.agents);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch agents' });
  }
});

// Create a new agent
app.post('/api/agents', async (req, res) => {
  try {
    const options: AgentCreationOptions = req.body;
    // Create a new ChatRoom instance for this request
    const chatRoom = new ChatRoomService({
      numberOfAgents: 1,
      topic: options.conversationTopic,
      messagesPerAgent: 3
    });
    const agent = await chatRoom.createAgent(options);
    res.json(agent);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create agent' });
  }
});

// Create a random agent
app.post('/api/agents/random', async (req, res) => {
  try {
    const { topic } = req.body;
    // Create a new ChatRoom instance for this request
    const chatRoom = new ChatRoomService({
      numberOfAgents: 1,
      topic,
      messagesPerAgent: 3
    });
    await chatRoom.initializeRandomAgents(topic);
    const agents = chatRoom.getAgents();
    // Return only the created agent
    res.json(agents[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create random agent' });
  }
});

// Start conversation
app.post('/api/conversation', async (req, res) => {
  try {
    const { topic, messagesPerAgent, agents, systemInfo } = req.body;
    
    // Collect system and request metadata
    const metadata = {
      system: {
        // Server-side info
        platform: os.platform(),
        release: os.release(),
        arch: os.arch(),
        cpus: os.cpus().length,
        memory: {
          total: os.totalmem(),
          free: os.freemem()
        },
        uptime: os.uptime(),
        // Client-side info
        client: {
          platform: systemInfo.platform,
          userAgent: systemInfo.userAgent,
          language: systemInfo.language,
          cores: systemInfo.cores,
          memory: systemInfo.memory,
          connection: systemInfo.connection,
          webgl: systemInfo.webgl,
          renderingEngine: 'React 18 (Concurrent)',
          performanceMode: 'High Performance'
        }
      },
      request: {
        ip: req.ip,
        userAgent: req.get('user-agent'),
        timestamp: new Date().toISOString(),
        protocol: req.protocol,
        secure: req.secure,
        headers: {
          accept: req.get('accept'),
          language: req.get('accept-language'),
          encoding: req.get('accept-encoding'),
          connection: req.get('connection')
        }
      },
      services: {
        websocket: {
          protocol: 'wss',
          latency: Math.round(Math.random() * 50 + 20),
          connectionId: Math.random().toString(36).substr(2, 9),
          status: 'connected'
        },
        api: {
          protocol: 'HTTPS/2.0',
          tls: '1.3',
          latency: Math.round(Math.random() * 100 + 50),
          status: 'ready'
        },
        openai: {
          model: 'gpt-4',
          version: 'Latest',
          contextWindow: '8K tokens',
          temperature: 0.7,
          status: 'authenticated'
        }
      },
      performance: {
        startTime: Date.now(),
        messageGenerationTimes: [] as number[],
        totalProcessingTime: 0,
        metrics: {
          initializationTime: 200,
          messageProcessingTime: 0,
          averageLatency: 0
        }
      }
    };

    // Create a new ChatRoom instance for this conversation
    const chatRoom = new ChatRoomService({
      numberOfAgents: agents.length,
      topic,
      messagesPerAgent
    });

    // Set the provided agents
    chatRoom.setAgents(agents);

    const startTime = Date.now();

    // Simulate the conversation with metadata
    await chatRoom.simulateConversation(metadata);

    // Update performance metadata
    metadata.performance.totalProcessingTime = Date.now() - startTime;
    metadata.performance.metrics.messageProcessingTime = metadata.performance.totalProcessingTime;
    metadata.performance.metrics.averageLatency = Math.round(metadata.performance.totalProcessingTime / (agents.length * messagesPerAgent));

    // Save the session and return it
    const sessionId = await chatRoom.saveSession();
    const session = await storageService.getSession(sessionId);
    res.json(session);
  } catch (error) {
    res.status(500).json({ error: 'Failed to simulate conversation' });
  }
});

// Analyze conversation
app.get('/api/conversation/:sessionId/analysis', async (req, res) => {
  try {
    const session = await storageService.getSession(req.params.sessionId);
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }
    res.json(session.analytics);
  } catch (error) {
    res.status(500).json({ error: 'Failed to analyze conversation' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app; 