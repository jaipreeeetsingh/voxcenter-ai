'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewAgentPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '', description: '', language: 'en', voice: 'nova',
    systemPrompt: '', greeting: 'Hello! How can I help you today?',
    provider: 'openai', model: 'gpt-4o-mini',
    maxDuration: 300, guardrailsEnabled: true,
    allowedTopics: '', blockedPhrases: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/agents', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
      router.push('/dashboard/agents');
    } catch (err) { console.error('Failed to create agent:', err); }
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-white mb-6">Create New Agent</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white">Basic Info</h2>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Agent Name</label>
            <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:border-blue-500 focus:outline-none" placeholder="e.g., Sales Outreach Bot" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Description</label>
            <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:border-blue-500 focus:outline-none h-20" placeholder="What does this agent do?" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Language</label>
              <select value={formData.language} onChange={e => setFormData({...formData, language: e.target.value})}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white">
                <option value="en">English</option><option value="es">Spanish</option><option value="fr">French</option>
                <option value="de">German</option><option value="multi">Multilingual</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Voice</label>
              <select value={formData.voice} onChange={e => setFormData({...formData, voice: e.target.value})}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white">
                <option value="nova">Nova (Female)</option><option value="aria">Aria (Female)</option>
                <option value="echo">Echo (Male)</option><option value="fable">Fable (Male)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white">AI Configuration</h2>
          <div>
            <label className="block text-sm text-gray-400 mb-1">System Prompt</label>
            <textarea value={formData.systemPrompt} onChange={e => setFormData({...formData, systemPrompt: e.target.value})}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:border-blue-500 focus:outline-none h-32 font-mono text-sm"
              placeholder="You are a helpful sales agent for..." />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Greeting Message</label>
            <input type="text" value={formData.greeting} onChange={e => setFormData({...formData, greeting: e.target.value})}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:border-blue-500 focus:outline-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">LLM Provider</label>
              <select value={formData.provider} onChange={e => setFormData({...formData, provider: e.target.value})}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white">
                <option value="openai">OpenAI</option><option value="azure">Azure</option><option value="google">Google</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Model</label>
              <select value={formData.model} onChange={e => setFormData({...formData, model: e.target.value})}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white">
                <option value="gpt-4o-mini">GPT-4o Mini</option><option value="gpt-4o">GPT-4o</option><option value="gpt-4-turbo">GPT-4 Turbo</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Guardrails</h2>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={formData.guardrailsEnabled} onChange={e => setFormData({...formData, guardrailsEnabled: e.target.checked})}
                className="w-4 h-4 rounded bg-gray-800 border-gray-700" />
              <span className="text-sm text-gray-400">Enabled</span>
            </label>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Allowed Topics (comma-separated)</label>
            <input type="text" value={formData.allowedTopics} onChange={e => setFormData({...formData, allowedTopics: e.target.value})}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:border-blue-500 focus:outline-none" placeholder="sales, product info, pricing" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Blocked Phrases (comma-separated)</label>
            <input type="text" value={formData.blockedPhrases} onChange={e => setFormData({...formData, blockedPhrases: e.target.value})}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:border-blue-500 focus:outline-none" placeholder="competitor names, profanity" />
          </div>
        </div>

        <div className="flex gap-3">
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 px-6 py-2.5 rounded-lg text-white font-medium transition">Create Agent</button>
          <button type="button" onClick={() => router.back()} className="bg-gray-800 hover:bg-gray-700 px-6 py-2.5 rounded-lg text-gray-300 font-medium transition">Cancel</button>
        </div>
      </form>
    </div>
  );
}
