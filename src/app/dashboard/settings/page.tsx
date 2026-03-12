export default function SettingsPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-white mb-6">Settings</h1>
      <div className="space-y-6">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">API Keys</h2>
          <div className="space-y-3">
            {['OpenAI', 'Deepgram', 'ElevenLabs', 'Twilio'].map((provider) => (
              <div key={provider} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <span className="text-gray-300">{provider}</span>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 font-mono text-sm">sk-...hidden</span>
                  <button className="text-blue-400 text-sm hover:text-blue-300">Edit</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Provider Configuration</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Default STT Provider</label>
              <select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white">
                <option>Deepgram (Nova-2)</option><option>Google Cloud STT</option><option>Azure Speech</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Default TTS Provider</label>
              <select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white">
                <option>ElevenLabs (Turbo v2.5)</option><option>Azure Neural TTS</option><option>Google Cloud TTS</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Default LLM Provider</label>
              <select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white">
                <option>OpenAI (GPT-4o-mini)</option><option>OpenAI (GPT-4o)</option><option>Azure OpenAI</option>
              </select>
            </div>
          </div>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Webhooks</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
              <div>
                <div className="text-gray-300">Call Started</div>
                <div className="text-gray-500 text-sm font-mono">https://api.example.com/webhook/call-start</div>
              </div>
              <span className="text-green-400 text-sm">Active</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
              <div>
                <div className="text-gray-300">Call Ended</div>
                <div className="text-gray-500 text-sm font-mono">https://api.example.com/webhook/call-end</div>
              </div>
              <span className="text-green-400 text-sm">Active</span>
            </div>
            <button className="text-blue-400 text-sm hover:text-blue-300">+ Add Webhook</button>
          </div>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2.5 rounded-lg text-white font-medium transition">Save Changes</button>
      </div>
    </div>
  );
}
