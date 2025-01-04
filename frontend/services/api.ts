import axios from 'axios';
import { Agent, ChatRoomConfig, AgentCreationOptions } from '../../src/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const apiService = {
  // Sessions
  getSessions: async (startAfter?: string) => {
    const url = startAfter 
      ? `${API_BASE_URL}/sessions?startAfter=${encodeURIComponent(startAfter)}`
      : `${API_BASE_URL}/sessions`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch sessions');
    return response.json();
  },

  getSession: async (sessionId: string) => {
    const response = await fetch(`${API_BASE_URL}/sessions/${sessionId}`);
    if (!response.ok) throw new Error('Failed to fetch session');
    return response.json();
  },

  getSessionAgents: async (sessionId: string) => {
    const response = await fetch(`${API_BASE_URL}/sessions/${sessionId}/agents`);
    if (!response.ok) throw new Error('Failed to fetch session agents');
    return response.json();
  },

  // Agents
  createAgent: async (options: AgentCreationOptions) => {
    const response = await fetch(`${API_BASE_URL}/agents`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(options)
    });
    if (!response.ok) throw new Error('Failed to create agent');
    return response.json();
  },

  createRandomAgent: async (topic: string) => {
    const response = await fetch(`${API_BASE_URL}/agents/random`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic })
    });
    if (!response.ok) throw new Error('Failed to create random agent');
    return response.json();
  },

  // Conversation
  startConversation: async (config: { topic: string; messagesPerAgent: number; agents: Agent[] }) => {
    // Collect system information
    const systemInfo = {
      platform: window.navigator.platform,
      userAgent: window.navigator.userAgent,
      language: window.navigator.language,
      cores: window.navigator.hardwareConcurrency,
      memory: (performance as any).memory?.jsHeapSizeLimit ? 
        `${Math.round((performance as any).memory.jsHeapSizeLimit / 1024 / 1024)}MB` : 'Unknown',
      connection: (navigator as any).connection?.effectiveType || 'Unknown',
      webgl: window.WebGLRenderingContext ? 'Enabled' : 'Disabled'
    };

    const response = await fetch(`${API_BASE_URL}/conversation`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...config,
        systemInfo
      })
    });
    if (!response.ok) throw new Error('Failed to start conversation');
    return response.json();
  },

  getConversationAnalysis: async (sessionId: string) => {
    const response = await fetch(`${API_BASE_URL}/conversation/${sessionId}/analysis`);
    if (!response.ok) throw new Error('Failed to get conversation analysis');
    return response.json();
  },
}; 
