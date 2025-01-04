import { useRouter } from 'next/navigation';

export default function EmptySessionState() {
  const router = useRouter();
  
  return (
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
  );
} 