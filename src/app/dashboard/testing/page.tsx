'use client';
import { useState } from 'react';

export default function TestingPage() {
  const [running, setRunning] = useState(false);
  const scenarios = [
    { id: '1', name: 'Sales Pitch Flow', agent: 'Sales Bot', turns: 8, lastRun: '2024-01-15', status: 'passed', passRate: 100, avgLatency: 234 },
    { id: '2', name: 'Objection Handling', agent: 'Sales Bot', turns: 12, lastRun: '2024-01-15', status: 'passed', passRate: 92, avgLatency: 287 },
    { id: '3', name: 'Support Escalation', agent: 'Support Agent', turns: 6, lastRun: '2024-01-14', status: 'failed', passRate: 67, avgLatency: 312 },
    { id: '4', name: 'Booking Happy Path', agent: 'Booking Agent', turns: 5, lastRun: '2024-01-14', status: 'passed', passRate: 100, avgLatency: 198 },
    { id: '5', name: 'Guardrail Boundary Test', agent: 'Sales Bot', turns: 10, lastRun: '2024-01-13', status: 'passed', passRate: 95, avgLatency: 256 },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Test Suite</h1>
        <div className="flex gap-2">
          <button onClick={() => setRunning(!running)}
            className={`px-4 py-2 rounded-lg font-medium transition ${running ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'} text-white`}>
            {running ? '⏹ Stop Tests' : '▶ Run All Tests'}
          </button>
          <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg text-gray-300 transition">+ New Scenario</button>
        </div>
      </div>

      <div className="grid gap-3">
        {scenarios.map((s) => (
          <div key={s.id} className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <span className={`w-3 h-3 rounded-full ${s.status === 'passed' ? 'bg-green-500' : 'bg-red-500'}`} />
                  <h3 className="text-white font-semibold">{s.name}</h3>
                </div>
                <div className="text-sm text-gray-400 mt-1 ml-6">Agent: {s.agent} | {s.turns} turns | Last: {s.lastRun}</div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="text-sm text-gray-400">Pass Rate</div>
                  <div className={`font-bold ${s.passRate >= 90 ? 'text-green-400' : s.passRate >= 70 ? 'text-yellow-400' : 'text-red-400'}`}>{s.passRate}%</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400">Avg Latency</div>
                  <div className={`font-bold ${s.avgLatency < 300 ? 'text-green-400' : 'text-yellow-400'}`}>{s.avgLatency}ms</div>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm text-gray-300 transition">Run</button>
                  <button className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm text-gray-300 transition">Edit</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
