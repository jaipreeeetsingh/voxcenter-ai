export default function CallsPage() {
  const calls = [
    { id: 'call_001', agent: 'Sales Bot', from: '+1 (555) 0123', to: '+1 (555) 9876', direction: 'outbound', duration: '4:32', status: 'completed', sentiment: 0.85, cost: '$0.42', date: '2024-01-15 14:32' },
    { id: 'call_002', agent: 'Support Agent', from: '+1 (555) 0456', to: '+1 (555) 5555', direction: 'inbound', duration: '2:15', status: 'completed', sentiment: 0.62, cost: '$0.21', date: '2024-01-15 13:18' },
    { id: 'call_003', agent: 'Booking Agent', from: '+1 (555) 0789', to: '+1 (555) 1234', direction: 'outbound', duration: '6:48', status: 'completed', sentiment: 0.91, cost: '$0.65', date: '2024-01-15 12:05' },
    { id: 'call_004', agent: 'Sales Bot', from: '+1 (555) 0321', to: '+1 (555) 4321', direction: 'outbound', duration: '1:03', status: 'failed', sentiment: 0.3, cost: '$0.08', date: '2024-01-15 11:42' },
    { id: 'call_005', agent: 'Support Agent', from: '+1 (555) 0654', to: '+1 (555) 8765', direction: 'inbound', duration: '3:27', status: 'active', sentiment: 0.74, cost: '$0.33', date: '2024-01-15 10:30' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Call History</h1>
        <div className="flex gap-2">
          <select className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm">
            <option>All Agents</option><option>Sales Bot</option><option>Support Agent</option><option>Booking Agent</option>
          </select>
          <select className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm">
            <option>All Status</option><option>Completed</option><option>Failed</option><option>Active</option>
          </select>
          <input type="text" placeholder="Search calls..." className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm w-48" />
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="text-gray-400 text-sm border-b border-gray-800">
              <th className="text-left px-6 py-3">Call ID</th>
              <th className="text-left px-6 py-3">Agent</th>
              <th className="text-left px-6 py-3">Direction</th>
              <th className="text-left px-6 py-3">From / To</th>
              <th className="text-left px-6 py-3">Duration</th>
              <th className="text-left px-6 py-3">Status</th>
              <th className="text-left px-6 py-3">Cost</th>
              <th className="text-left px-6 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {calls.map((call) => (
              <tr key={call.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition cursor-pointer">
                <td className="px-6 py-3 text-blue-400 font-mono text-sm">{call.id}</td>
                <td className="px-6 py-3 text-white">{call.agent}</td>
                <td className="px-6 py-3">
                  <span className={`px-2 py-1 rounded text-xs ${call.direction === 'inbound' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>
                    {call.direction === 'inbound' ? '↓ In' : '↑ Out'}
                  </span>
                </td>
                <td className="px-6 py-3 text-gray-400 text-sm">{call.from}</td>
                <td className="px-6 py-3 text-gray-300">{call.duration}</td>
                <td className="px-6 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    call.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                    call.status === 'active' ? 'bg-blue-500/20 text-blue-400' : 'bg-red-500/20 text-red-400'
                  }`}>{call.status}</span>
                </td>
                <td className="px-6 py-3 text-gray-300">{call.cost}</td>
                <td className="px-6 py-3 text-gray-400 text-sm">{call.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
