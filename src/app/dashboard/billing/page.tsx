export default function BillingPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Billing & Usage</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <div className="text-gray-400 text-sm">Current Plan</div>
          <div className="text-2xl font-bold text-white mt-1">Professional</div>
          <div className="text-blue-400 text-sm mt-1">$249/month</div>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <div className="text-gray-400 text-sm">Minutes Used</div>
          <div className="text-2xl font-bold text-white mt-1">2,847 / 5,000</div>
          <div className="w-full bg-gray-700 rounded-full h-2 mt-2"><div className="bg-blue-500 h-2 rounded-full" style={{width:'57%'}}/></div>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <div className="text-gray-400 text-sm">Rollover Minutes</div>
          <div className="text-2xl font-bold text-green-400 mt-1">+847</div>
          <div className="text-gray-400 text-sm mt-1">From last month</div>
        </div>
      </div>
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
        <h2 className="text-lg font-semibold text-white mb-4">Cost Breakdown (This Month)</h2>
        <div className="space-y-3">
          {[
            { label: 'Speech-to-Text (Deepgram)', cost: '$42.30', pct: 33 },
            { label: 'Text-to-Speech (ElevenLabs)', cost: '$51.20', pct: 40 },
            { label: 'LLM Processing (OpenAI)', cost: '$28.50', pct: 22 },
            { label: 'Telephony (Twilio)', cost: '$6.40', pct: 5 },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <span className="text-gray-300 w-48">{item.label}</span>
                <div className="flex-1 bg-gray-800 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{width: item.pct + '%'}} />
                </div>
              </div>
              <span className="text-white font-medium ml-4">{item.cost}</span>
            </div>
          ))}
          <div className="border-t border-gray-800 pt-3 flex justify-between">
            <span className="text-white font-semibold">Total</span>
            <span className="text-white font-bold text-lg">$128.40</span>
          </div>
        </div>
      </div>
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Cost Alerts</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
            <span className="text-gray-300">Alert at 80% usage</span>
            <span className="text-green-400 text-sm">Active</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
            <span className="text-gray-300">Alert at $200 monthly spend</span>
            <span className="text-green-400 text-sm">Active</span>
          </div>
          <button className="text-blue-400 text-sm hover:text-blue-300">+ Add Alert</button>
        </div>
      </div>
    </div>
  );
}
