'use client';

import React, { useEffect, useState } from 'react';
import AppLayout from '../../components/AppLayout';
import SessionCard from '../../components/SessionCard';
import SessionSkeleton from '../../components/SessionSkeleton';
import EmptySessionState from '../../components/EmptySessionState';
import { apiService } from '../../services/api';

export default function Sessions() {
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
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-pink text-transparent bg-clip-text">
              Experiment Archives
            </h1>
            <p className="text-xl text-gray-400">
              Access and analyze your past AI conversations
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => <SessionSkeleton key={i} />)
            ) : sessions.length > 0 ? (
              sessions.map((session) => <SessionCard key={session.id} session={session} />)
            ) : (
              <EmptySessionState />
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