'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiService } from '../../services/api';
import AppLayout from '../../components/AppLayout';

export default function Sessions() {
  const router = useRouter();
  const [sessions, setSessions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [lastSessionId, setLastSessionId] = useState<string | undefined>();
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    try {
      setIsLoading(true);
      const result = await apiService.getSessions(lastSessionId);
      setSessions(prev => lastSessionId ? [...prev, ...result.sessions] : result.sessions);
      setHasMore(result.hasMore);
      if (result.sessions.length > 0) {
        setLastSessionId(result.sessions[result.sessions.length - 1].id);
      }
    } catch (err) {
      setError('Failed to load sessions');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      loadSessions();
    }
  };

  return (
    <AppLayout>
      <div className="min-h-screen p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-pink text-transparent bg-clip-text">
              Experiment Archives
            </h1>
            <p className="text-xl text-gray-400">
              Access and analyze your past AI conversations
            </p>
          </div>

          {/* Sessions Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
              // Loading skeletons
              Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-terminal-black border border-cyber-blue/30 rounded-lg p-6 animate-pulse"
                >
                  <div className="h-6 bg-cyber-blue/10 rounded mb-4" />
                  <div className="h-4 bg-cyber-blue/10 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-cyber-blue/10 rounded w-1/2" />
                </div>
              ))
            ) : sessions.length > 0 ? (
              sessions.map((session) => (
                <div
                  key={session.id}
                  onClick={() => router.push(`/laboratory?session=${session.id}`)}
                  className="group bg-terminal-black border border-cyber-blue/30 rounded-lg p-6 cursor-pointer hover:border-cyber-blue/60 transition-all"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold text-cyber-blue group-hover:bg-gradient-to-r group-hover:from-cyber-blue group-hover:to-cyber-purple group-hover:text-transparent group-hover:bg-clip-text transition-all">
                        {session.topic}
                      </h3>
                      <span className="text-sm text-gray-400">
                        {session.agents?.length || 0} agents
                      </span>
                    </div>
                    <p className="text-sm text-gray-400">
                      {new Date(session.timestamp).toLocaleString()}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {session.analytics?.mainTopics?.slice(0, 3).map((topic: string, index: number) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-cyber-purple/10 border border-cyber-purple/30 rounded-full text-cyber-purple text-xs"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-cyber-pink">
                        {session.messages?.length || 0} messages
                      </span>
                      <div className="flex items-center text-cyber-blue group-hover:translate-x-1 transition-transform">
                        View Analysis
                        <span className="ml-1">→</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-6xl mb-4">🧪</div>
                <h3 className="text-xl font-bold text-cyber-purple mb-2">No Experiments Yet</h3>
                <p className="text-gray-400 mb-6">Start your first AI conversation experiment</p>
                <button
                  onClick={() => router.push('/laboratory')}
                  className="bg-gradient-to-r from-cyber-blue to-cyber-purple text-white font-bold py-3 px-8 rounded-lg hover:opacity-90 transition-opacity"
                >
                  Enter Laboratory
                </button>
              </div>
            )}
          </div>

          {hasMore && (
            <div className="flex justify-center">
              <button
                onClick={handleLoadMore}
                disabled={isLoading}
                className="bg-gradient-to-r from-cyber-blue to-cyber-purple text-white font-bold py-3 px-8 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isLoading ? 'Loading...' : 'Load More Sessions'}
              </button>
            </div>
          )}

          {error && (
            <div className="bg-red-900/50 border border-red-500 text-red-200 p-4 rounded-lg">
              {error}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
} 