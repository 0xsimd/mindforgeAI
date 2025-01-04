import React, { useEffect, useState } from 'react';
import { apiService } from '../services/api';

interface LoadSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadAgents: (sessionId: string) => Promise<void>;
}

export default function LoadSessionModal({ isOpen, onClose, onLoadAgents }: LoadSessionModalProps) {
  const [sessions, setSessions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [lastSessionId, setLastSessionId] = useState<string | undefined>();
  const [hasMore, setHasMore] = useState(false);
  const [manualSessionId, setManualSessionId] = useState('');

  useEffect(() => {
    if (isOpen) {
      loadSessions();
    } else {
      // Reset state when modal closes
      setSessions([]);
      setLastSessionId(undefined);
      setHasMore(false);
      setManualSessionId('');
    }
  }, [isOpen]);

  const loadSessions = async () => {
    setIsLoading(true);
    try {
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

  const handleLoadAgents = async (id: string) => {
    if (!id) return;
    setIsLoading(true);
    try {
      await onLoadAgents(id);
    } catch (err) {
      setError('Failed to load agents');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-terminal-black border border-cyber-pink/30 rounded-lg p-6 max-w-lg w-full mx-4 space-y-4"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-cyber-pink">Load Agents from Session</h2>
        
        {/* Manual Session ID Input */}
        <div className="space-y-3">
          <h3 className="text-base font-bold text-cyber-purple">Enter Session ID</h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={manualSessionId}
              onChange={(e) => setManualSessionId(e.target.value)}
              placeholder="Enter session ID"
              className="flex-1 bg-black/50 border border-cyber-purple/30 rounded-lg px-3 py-1.5 focus:border-cyber-purple/60 outline-none text-white placeholder-gray-500"
            />
            <button
              onClick={() => handleLoadAgents(manualSessionId)}
              disabled={!manualSessionId || isLoading}
              className="bg-gradient-to-r from-cyber-purple to-cyber-pink text-white font-bold py-1.5 px-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              Load
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-terminal-black px-3 text-gray-400 text-sm">OR</span>
          </div>
        </div>
        
        {/* Session List */}
        <div className="space-y-3">
          <h3 className="text-base font-bold text-cyber-pink">Select Recent Session</h3>
          <div className="max-h-64 overflow-y-auto space-y-3">
            {sessions.map((session) => (
              <button
                key={session.id}
                onClick={() => handleLoadAgents(session.id)}
                className="w-full text-left bg-cyber-blue/5 p-3 rounded-lg hover:bg-cyber-blue/10 transition-colors group"
              >
                <h3 className="text-base font-semibold text-cyber-pink mb-1">{session.topic}</h3>
                <div className="text-xs text-cyber-blue/70 flex justify-between items-center">
                  <span>{new Date(session.timestamp).toLocaleString()}</span>
                  <span className="flex items-center">
                    {session.agents?.length || 0} Agents
                    <span className="ml-2 opacity-0 group-hover:opacity-100 transform translate-x-[-8px] group-hover:translate-x-0 transition-all">
                      →
                    </span>
                  </span>
                </div>
                <p className="text-xs text-cyber-pink mt-1">ID: {session.id}</p>
              </button>
            ))}

            {isLoading && (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-cyber-blue/5 p-3 rounded-lg animate-pulse">
                    <div className="h-3 bg-cyber-blue/20 rounded w-3/4 mb-2"></div>
                    <div className="h-2 bg-cyber-blue/20 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {hasMore && (
            <button
              onClick={handleLoadMore}
              disabled={isLoading}
              className="w-full px-3 py-1.5 text-cyber-blue hover:bg-cyber-blue/10 rounded-lg transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Loading...' : 'Load More'}
            </button>
          )}
        </div>

        {error && (
          <div className="bg-red-900/50 border border-red-500 text-red-200 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-cyber-blue hover:bg-cyber-blue/10 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}