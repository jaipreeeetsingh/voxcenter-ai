export default function KnowledgeBasePage() {
  const documents = [
    { id: '1', name: 'Product Catalog 2024', type: 'PDF', size: '2.4 MB', chunks: 156, agents: ['Sales Bot', 'Support Agent'], updated: '2024-01-14' },
    { id: '2', name: 'FAQ Database', type: 'JSON', size: '890 KB', chunks: 342, agents: ['Support Agent'], updated: '2024-01-15' },
    { id: '3', name: 'Pricing Guide', type: 'PDF', size: '1.1 MB', chunks: 67, agents: ['Sales Bot'], updated: '2024-01-10' },
    { id: '4', name: 'Company Policies', type: 'DOCX', size: '456 KB', chunks: 89, agents: ['Support Agent', 'Booking Agent'], updated: '2024-01-08' },
  ];
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Knowledge Base</h1>
        <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white font-medium transition">+ Upload Document</button>
      </div>
      <div className="grid gap-4">
        {documents.map((doc) => (
          <div key={doc.id} className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center text-lg">
                  {doc.type === 'PDF' ? '📄' : doc.type === 'JSON' ? '📋' : '📝'}
                </div>
                <div>
                  <h3 className="text-white font-semibold">{doc.name}</h3>
                  <div className="text-sm text-gray-400 mt-1">{doc.type} | {doc.size} | {doc.chunks} chunks | Updated: {doc.updated}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  {doc.agents.map((a, i) => (
                    <span key={i} className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">{a}</span>
                  ))}
                </div>
                <button className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm text-gray-300 transition">Edit</button>
                <button className="px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-sm text-red-400 transition">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
