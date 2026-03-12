import Link from 'next/link';

export default function AgentsPage() {
  const agents = [
    { id: '1', name: 'Sales Outreach Bot', status: 'active', calls: 3847, avgDuration: '3:42', satisfaction: 92, language: 'English', voice: 'Nova' },
    { id: '2', name: 'Customer Support Agent', status: 'active', calls: 8291, avgDuration: '5:15', satisfaction: 88, language: 'English', voice: 'Aria' },
    { id: '3', name: 'Appointment Booking', status: 'active', calls: 2156, avgDuration: '2:30', satisfaction: 95, language: 'Multi', voice: 'Echo' },
    { id: '4', name: 'Survey Caller', status: 'paused', calls: 1024, avgDuration: '1:45', satisfaction: 78, language: 'English', voice: 'Fable' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">AI Agents</h1>
        <Link href="/dashboard/agents/new" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white font-medium transition">
          + Create Agent
        </Link>
      </div>

      <div className="grid gap-4">
        {agents.map((agent) => (
          <div key={agent.id} className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-xl">
                  🤖
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">{agent.name}</h3>
                  <div className="flex items-center gap-3 text-sm text-gray-400 mt-1">
                    <span>{agent.language}</span>
                    <span>•</span>
                    <span>Voice: {agent.voice}</span>
                    <span>•</span>
                    <span>{agent.calls.toLocaleString()} calls</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  agent.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {agent.status}
                </span>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm text-gray-300 transition">Edit</button>
                  <button className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm text-gray-300 transition">Test</button>
                  <button className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm text-gray-300 transition">Logs</button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-800">
              <div>
                <span className="text-gray-400 text-sm">Avg Duration</span>
                <div className="text-white font-medium">{agent.avgDuration}</div>
              </div>
              <div>
                <span className="text-gray-400 text-sm">Satisfaction</span>
                <div className="text-white font-medium">{agent.satisfaction}%</div>
              </div>
              <div>
                <span className="text-gray-400 text-sm">Total Calls</span>
                <div className="text-white font-medium">{agent.calls.toLocaleString()}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
