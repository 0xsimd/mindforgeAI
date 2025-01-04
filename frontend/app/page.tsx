'use client';

import Link from 'next/link';
import AppLayout from '../components/AppLayout';

export default function Home() {
  return (
    <AppLayout>
      <div className="min-h-screen p-8">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto pt-20 pb-32 text-center relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[800px] h-[800px] bg-gradient-to-r from-cyber-blue/20 to-cyber-purple/20 rounded-full blur-3xl animate-pulse" />
          </div>
          <div className="relative">
            <h1 className="text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-pink text-transparent bg-clip-text">
                Mindforge AI
              </span>
            </h1>
            <p className="text-2xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Your advanced playground for AI agent experiments and multi-agent conversations
            </p>
            <div className="space-y-6 flex flex-col items-center">
              <div className="flex space-x-4">
                <Link
                  href="/laboratory"
                  className="inline-flex items-center px-8 py-4 rounded-lg bg-gradient-to-r from-cyber-blue to-cyber-purple text-white font-bold text-lg hover:opacity-90 transition-opacity group"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M9 3L9 21M15 3L15 21M3 9L21 9M3 15L21 15M3.6 3H20.4C20.7314 3 21 3.26863 21 3.6V20.4C21 20.7314 20.7314 21 20.4 21H3.6C3.26863 21 3 20.7314 3 20.4V3.6C3 3.26863 3.26863 3 3.6 3Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  Enter Laboratory
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </Link>

                <Link
                  href="/sessions" 
                  className="inline-flex items-center px-8 py-4 rounded-lg bg-gradient-to-r from-cyber-blue to-cyber-purple text-white font-bold text-lg hover:opacity-90 transition-opacity group"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Explore the Library
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-7xl mx-auto py-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-terminal-black border border-cyber-blue/30 rounded-lg p-8 hover:border-cyber-blue/60 transition-all group">
              <div className="w-16 h-16 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-lg flex items-center justify-center mb-6 group-hover:animate-glow">
                <span className="text-3xl">🤖</span>
              </div>
              <h3 className="text-xl font-bold text-cyber-blue mb-4">AI Agent Creation</h3>
              <p className="text-gray-400">
                Design and customize AI agents with unique personalities, expertise, and communication styles
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-terminal-black border border-cyber-purple/30 rounded-lg p-8 hover:border-cyber-purple/60 transition-all group">
              <div className="w-16 h-16 bg-gradient-to-r from-cyber-purple to-cyber-pink rounded-lg flex items-center justify-center mb-6 group-hover:animate-glow">
                <span className="text-3xl">💬</span>
              </div>
              <h3 className="text-xl font-bold text-cyber-purple mb-4">Dynamic Conversations</h3>
              <p className="text-gray-400">
                Watch AI agents engage in real-time discussions on any topic with sophisticated interactions
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-terminal-black border border-cyber-pink/30 rounded-lg p-8 hover:border-cyber-pink/60 transition-all group">
              <div className="w-16 h-16 bg-gradient-to-r from-cyber-pink to-cyber-purple rounded-lg flex items-center justify-center mb-6 group-hover:animate-glow">
                <span className="text-3xl">📊</span>
              </div>
              <h3 className="text-xl font-bold text-cyber-pink mb-4">Advanced Analytics</h3>
              <p className="text-gray-400">
                Analyze conversation dynamics, cognitive patterns, and emergent behaviors in detail
              </p>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="max-w-7xl mx-auto py-20">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-cyber-blue to-cyber-purple text-transparent bg-clip-text">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="bg-terminal-black border border-cyber-blue/30 rounded-lg p-8">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-lg flex items-center justify-center text-2xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-bold text-cyber-blue mt-4 mb-4">Create Agents</h3>
                <p className="text-gray-400">
                  Design your AI agents with distinct personalities and expertise
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="bg-terminal-black border border-cyber-purple/30 rounded-lg p-8">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-cyber-purple to-cyber-pink rounded-lg flex items-center justify-center text-2xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-bold text-cyber-purple mt-4 mb-4">Start Conversation</h3>
                <p className="text-gray-400">
                  Choose a topic and let your agents engage in dynamic discussion
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="bg-terminal-black border border-cyber-pink/30 rounded-lg p-8">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-cyber-pink to-cyber-purple rounded-lg flex items-center justify-center text-2xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-bold text-cyber-pink mt-4 mb-4">Analyze Results</h3>
                <p className="text-gray-400">
                  Review detailed analytics and insights from the conversation
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="max-w-7xl mx-auto py-20 text-center">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-pink text-transparent bg-clip-text">
            Ready to Start Experimenting?
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Enter the laboratory and witness the future of AI agent interactions
          </p>
          <Link
            href="/laboratory"
            className="inline-flex items-center px-8 py-4 rounded-lg bg-gradient-to-r from-cyber-blue to-cyber-purple text-white font-bold text-lg hover:opacity-90 transition-opacity group"
          >
            Start Your First Experiment
            <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </AppLayout>
  );
} 