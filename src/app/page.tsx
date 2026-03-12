import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white">
      {/* Navigation */}
      <nav className="border-b border-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg" />
            <span className="text-xl font-bold">VoxCenter AI</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-400 hover:text-white transition">Features</a>
            <a href="#pricing" className="text-gray-400 hover:text-white transition">Pricing</a>
            <a href="#docs" className="text-gray-400 hover:text-white transition">Docs</a>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-gray-400 hover:text-white transition">Sign In</Link>
            <Link href="/dashboard" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium transition">
              Get Started Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <div className="inline-block px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm mb-6">
          Built from 2,000+ competitor complaints
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          AI Call Center<br />That Actually Works
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
          Sub-300ms latency. Zero hallucinations. Transparent pricing with minute rollover.
          The platform competitors wish they had built.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/dashboard" className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-medium text-lg transition">
            Start Building Free
          </Link>
          <a href="#demo" className="border border-gray-700 hover:border-gray-500 px-8 py-3 rounded-lg font-medium text-lg transition">
            Watch Demo
          </a>
        </div>
        <div className="flex gap-8 justify-center mt-12 text-sm text-gray-500">
          <div><span className="text-white font-semibold text-2xl">300ms</span><br/>Avg Latency</div>
          <div><span className="text-white font-semibold text-2xl">99.9%</span><br/>Uptime SLA</div>
          <div><span className="text-white font-semibold text-2xl">50+</span><br/>Languages</div>
          <div><span className="text-white font-semibold text-2xl">$0.05</span><br/>Per Minute</div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-4">We Solved Their Problems</h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          We analyzed thousands of reviews from Retell, Vapi, Bland, Synthflow, and Air AI to build something better.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { problem: 'Hidden costs & surprise bills', solution: 'Real-time cost dashboard with per-call breakdown + minute rollover', icon: '💰' },
            { problem: 'AI hallucinations & going off-script', solution: 'Built-in guardrails with topic boundaries & response validation', icon: '🛡️' },
            { problem: 'High latency ruining conversations', solution: 'Sub-300ms response with provider auto-failover', icon: '⚡' },
            { problem: 'Vendor lock-in with one provider', solution: 'Hot-swap between OpenAI, Deepgram, ElevenLabs & more', icon: '🔄' },
            { problem: 'No way to test before deploying', solution: 'Built-in test suite with scenario simulation', icon: '🧪' },
            { problem: 'Poor debugging & call analytics', solution: 'Real-time conversation intelligence & sentiment tracking', icon: '📊' },
          ].map((item, i) => (
            <div key={i} className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-blue-500/50 transition">
              <div className="text-3xl mb-3">{item.icon}</div>
              <div className="text-red-400 text-sm mb-2 line-through">{item.problem}</div>
              <div className="text-white font-medium">{item.solution}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Simple, Transparent Pricing</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: 'Starter', price: '$0.08', minutes: '500', features: ['5 Agents', 'Basic Analytics', 'Email Support', 'Minute Rollover'] },
            { name: 'Professional', price: '$0.05', minutes: '5,000', features: ['25 Agents', 'Advanced Analytics', 'Priority Support', 'Provider Swapping', 'Guardrails', 'Test Suite'], popular: true },
            { name: 'Enterprise', price: '$0.03', minutes: '50,000+', features: ['Unlimited Agents', 'Custom Models', 'Dedicated Support', 'SLA 99.99%', 'On-Premise Option', 'Custom Integrations'] },
          ].map((plan, i) => (
            <div key={i} className={`bg-gray-800/50 border rounded-xl p-8 ${plan.popular ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-700'}`}>
              {plan.popular && <div className="text-blue-400 text-sm font-medium mb-2">Most Popular</div>}
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <div className="text-4xl font-bold mb-1">{plan.price}<span className="text-lg text-gray-400">/min</span></div>
              <div className="text-gray-400 text-sm mb-6">{plan.minutes} minutes/month</div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-gray-300">
                    <span className="text-green-400">✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link href="/dashboard" className={`block text-center py-3 rounded-lg font-medium transition ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-700 hover:bg-gray-600'}`}>
                Get Started
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 px-6 py-12 mt-20">
        <div className="max-w-7xl mx-auto text-center text-gray-500">
          <p>© 2024 VoxCenter AI. Built to be better.</p>
        </div>
      </footer>
    </div>
  );
}
