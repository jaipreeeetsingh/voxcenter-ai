export default function DashboardPage() {
  const stats = [
    { label: 'Total Calls', value: '12,847', change: '+12%', icon: '📞' },
    { label: 'Active Agents', value: '24', change: '+3', icon: '🤖' },
    { label: 'Avg Latency', value: '247ms', change: '-15%', icon: '⚡' },
    { label: 'Monthly Cost', value: '$1,284', change: '-8%', icon: '💰' },
  ];

  const recentCalls = [
    { id: 'call_001', agent: 'Sales Bot', number: '+1 (555) 0123', duration: '4:32', status: 'completed', sentiment: 0.85, cost: '$0.42' },
    { id: 'call_002', agent: 'Support Agent', number: '+1 (555) 0456', duration: '2:15', status: 'completed', sentiment: 0.62, cost: '$0.21' },
    { id: 'call_003', agent: 'Booking Agent', number: '+1 (555) 0789', duration: '6:48', status: 'completed', sentiment: 0.91, cost: '$0.65' },
    { id: 'call_004', agent: 'Sales Bot', number: '+1 (555) 0321', duration: '1:03', status: 'failed', sentiment: 0.3, cost: '$0.08' },
    { id: 'call_005', agent: 'Support Agent', number: '+1 (555) 0654', duration: '3:27', status: 'active', sentiment: 0.74, cost: '$0.33' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Dashboard Overview</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-400 text-sm">{stat.label}</span>
              <span className="text-2xl">{stat.icon}</span>
            </div>
            <div className="text-3xl font-bold text-white">{stat.value}</div>
            <div className={`text-sm mt-1 ${stat.change.startsWith('+') || stat.change.startsWith('-') ? (stat.change.includes('-') && stat.label !== 'Monthly Cost' ? 'text-red-400' : 'text-green-400') : 'text-gray-400'}`}>
              {stat.change} from last month
            </div>
          </div>
        ))}
      </div>

      {/* Recent Calls Table */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Recent Calls</h2>
          <button className="text-blue-400 text-sm hover:text-blue-300">View All</button>
        </div>
        <table className="w-full">
          <thead>
            <tr className="text-gray-400 text-sm border-b border-gray-800">
              <th className="text-left px-6 py-3">Call ID</th>
              <th className="text-left px-6 py-3">Agent</th>
              <th className="text-left px-6 py-3">Number</th>
              <th className="text-left px-6 py-3">Duration</th>
              <th className="text-left px-6 py-3">Status</th>
              <th className="text-left px-6 py-3">Sentiment</th>
              <th className="text-left px-6 py-3">Cost</th>
            </tr>
          </thead>
          <tbody>
            {recentCalls.map((call) => (
              <tr key={call.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition">
                <td className="px-6 py-3 text-gray-300 font-mono text-sm">{call.id}</td>
                <td className="px-6 py-3 text-white">{call.agent}</td>
                <td className="px-6 py-3 text-gray-400">{call.number}</td>
                <td className="px-6 py-3 text-gray-300">{call.duration}</td>
                <td className="px-6 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    call.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                    call.status === 'active' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>{call.status}</span>
                </td>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-gray-700 rounded-full">
                      <div className={`h-1.5 rounded-full ${call.sentiment > 0.7 ? 'bg-green-500' : call.sentiment > 0.4 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: (call.sentiment * 100) + '%' }} />
                    </div>
                    <span className="text-gray-400 text-sm">{(call.sentiment * 100).toFixed(0)}%</span>
                  </div>
                </td>
                <td className="px-6 py-3 text-gray-300">{call.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
