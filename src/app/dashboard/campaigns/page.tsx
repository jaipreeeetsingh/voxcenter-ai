export default function CampaignsPage() {
  const campaigns = [
    { id: '1', name: 'Q1 Sales Outreach', agent: 'Sales Bot', status: 'active', contacts: 5000, completed: 3247, successRate: 34, startDate: '2024-01-01' },
    { id: '2', name: 'Customer Re-engagement', agent: 'Support Agent', status: 'active', contacts: 2000, completed: 1456, successRate: 42, startDate: '2024-01-10' },
    { id: '3', name: 'Appointment Reminders', agent: 'Booking Agent', status: 'completed', contacts: 800, completed: 800, successRate: 91, startDate: '2024-01-05' },
    { id: '4', name: 'Survey Campaign', agent: 'Survey Caller', status: 'paused', contacts: 3000, completed: 542, successRate: 28, startDate: '2024-01-12' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Campaigns</h1>
        <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white font-medium transition">+ New Campaign</button>
      </div>
      <div className="grid gap-4">
        {campaigns.map((c) => (
          <div key={c.id} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-white font-semibold text-lg">{c.name}</h3>
                <div className="text-sm text-gray-400 mt-1">Agent: {c.agent} | Started: {c.startDate}</div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                c.status === 'active' ? 'bg-green-500/20 text-green-400' :
                c.status === 'completed' ? 'bg-blue-500/20 text-blue-400' :
                'bg-yellow-500/20 text-yellow-400'
              }`}>{c.status}</span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <span className="text-gray-400 text-sm">Progress</span>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 bg-gray-800 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: (c.completed/c.contacts*100)+'%'}} />
                  </div>
                  <span className="text-white text-sm">{Math.round(c.completed/c.contacts*100)}%</span>
                </div>
              </div>
              <div>
                <span className="text-gray-400 text-sm">Contacts</span>
                <div className="text-white font-medium">{c.completed.toLocaleString()} / {c.contacts.toLocaleString()}</div>
              </div>
              <div>
                <span className="text-gray-400 text-sm">Success Rate</span>
                <div className={`font-medium ${c.successRate >= 40 ? 'text-green-400' : c.successRate >= 25 ? 'text-yellow-400' : 'text-red-400'}`}>{c.successRate}%</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
