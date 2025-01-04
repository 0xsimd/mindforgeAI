import { useRouter } from 'next/navigation';

interface SessionCardProps {
  session: any;
}

export default function SessionCard({ session }: SessionCardProps) {
  const router = useRouter();

  return (
    <div
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
  );
} 