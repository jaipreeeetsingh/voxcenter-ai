export default function PhoneNumbersPage() {
  const numbers = [
    { number: '+1 (555) 100-0001', label: 'Sales Line 1', agent: 'Sales Bot', type: 'local', status: 'active', calls: 1247 },
    { number: '+1 (555) 100-0002', label: 'Support Main', agent: 'Support Agent', type: 'toll-free', status: 'active', calls: 3891 },
    { number: '+1 (555) 100-0003', label: 'Booking Line', agent: 'Booking Agent', type: 'local', status: 'active', calls: 892 },
    { number: '+44 20 7946 0958', label: 'UK Support', agent: 'Support Agent', type: 'international', status: 'inactive', calls: 156 },
  ];
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Phone Numbers</h1>
        <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white font-medium transition">+ Buy Number</button>
      </div>
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead><tr className="text-gray-400 text-sm border-b border-gray-800">
            <th className="text-left px-6 py-3">Number</th><th className="text-left px-6 py-3">Label</th>
            <th className="text-left px-6 py-3">Agent</th><th className="text-left px-6 py-3">Type</th>
            <th className="text-left px-6 py-3">Status</th><th className="text-left px-6 py-3">Calls</th>
          </tr></thead>
          <tbody>
            {numbers.map((n, i) => (
              <tr key={i} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition">
                <td className="px-6 py-3 text-white font-mono">{n.number}</td>
                <td className="px-6 py-3 text-gray-300">{n.label}</td>
                <td className="px-6 py-3 text-gray-300">{n.agent}</td>
                <td className="px-6 py-3"><span className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-400">{n.type}</span></td>
                <td className="px-6 py-3"><span className={`px-2 py-1 rounded-full text-xs font-medium ${n.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>{n.status}</span></td>
                <td className="px-6 py-3 text-gray-300">{n.calls.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
