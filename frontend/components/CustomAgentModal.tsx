import { useState } from 'react';

interface CustomAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (agentData: any) => void;
}

export default function CustomAgentModal({ isOpen, onClose, onSubmit }: CustomAgentModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    personality: '',
    background: '',
    expertise: '',
    beliefs: '',
    quirks: '',
    communication: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">Create Custom Agent</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Agent's name"
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Personality */}
          <div>
            <label className="block text-sm font-medium mb-2">Personality</label>
            <textarea
              value={formData.personality}
              onChange={(e) => setFormData({ ...formData, personality: e.target.value })}
              placeholder="Describe the agent's personality"
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              rows={3}
            />
          </div>

          {/* Background */}
          <div>
            <label className="block text-sm font-medium mb-2">Background</label>
            <textarea
              value={formData.background}
              onChange={(e) => setFormData({ ...formData, background: e.target.value })}
              placeholder="Agent's background and history"
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              rows={3}
            />
          </div>

          {/* Expertise */}
          <div>
            <label className="block text-sm font-medium mb-2">Areas of Expertise</label>
            <input
              type="text"
              value={formData.expertise}
              onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
              placeholder="Comma-separated list of expertise areas"
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Beliefs */}
          <div>
            <label className="block text-sm font-medium mb-2">Core Beliefs</label>
            <input
              type="text"
              value={formData.beliefs}
              onChange={(e) => setFormData({ ...formData, beliefs: e.target.value })}
              placeholder="Comma-separated list of core beliefs"
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Quirks */}
          <div>
            <label className="block text-sm font-medium mb-2">Quirks</label>
            <input
              type="text"
              value={formData.quirks}
              onChange={(e) => setFormData({ ...formData, quirks: e.target.value })}
              placeholder="Comma-separated list of quirks"
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Communication Style */}
          <div>
            <label className="block text-sm font-medium mb-2">Communication Style</label>
            <input
              type="text"
              value={formData.communication}
              onChange={(e) => setFormData({ ...formData, communication: e.target.value })}
              placeholder="Describe the communication style"
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Create Agent
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 