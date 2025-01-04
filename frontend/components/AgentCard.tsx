import React from 'react';
import { Agent } from '../../src/types';

interface AgentCardProps {
  agent?: Agent;
  onRemove?: () => void;
  isLoading?: boolean;
}

export default function AgentCard({ agent, onRemove, isLoading }: AgentCardProps) {
  if (isLoading) {
    return (
      <div className="relative bg-terminal-black border border-cyber-blue/30 rounded-lg p-6 animate-pulse">
        <div className="h-6 w-3/4 bg-cyber-blue/20 rounded mb-4"></div>
        <div className="space-y-3">
          <div className="h-4 bg-cyber-blue/20 rounded w-full"></div>
          <div className="h-4 bg-cyber-blue/20 rounded w-5/6"></div>
          <div className="h-4 bg-cyber-blue/20 rounded w-4/6"></div>
        </div>
      </div>
    );
  }

  if (!agent) return null;

  return (
    <div className="relative bg-terminal-black border border-cyber-blue/30 rounded-lg p-6 group hover:border-cyber-blue/60 transition-colors">
      {/* Agent Header */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold bg-gradient-to-r from-cyber-blue to-cyber-purple text-transparent bg-clip-text">
          {agent.name}
        </h3>
        {onRemove && (
          <button
            onClick={onRemove}
            className="text-cyber-pink hover:text-cyber-pink/80 transition-colors"
          >
            ×
          </button>
        )}
      </div>

      {/* Agent Details */}
      <div className="space-y-3 text-sm">
        <p className="text-gray-300">{agent.personality}</p>
        
        {/* Expertise */}
        {agent.expertise && agent.expertise.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {agent.expertise.map((exp, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-cyber-purple/10 border border-cyber-purple/30 rounded text-cyber-purple text-xs"
              >
                {exp}
              </span>
            ))}
          </div>
        )}

        {/* Traits */}
        {agent.traits && agent.traits.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {agent.traits.map((trait, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-cyber-blue/10 border border-cyber-blue/30 rounded text-cyber-blue text-xs"
              >
                {trait}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyber-blue/0 to-cyber-purple/0 opacity-0 group-hover:opacity-10 transition-opacity rounded-lg pointer-events-none"></div>
    </div>
  );
} 