import React from 'react';
import { Database, Search } from 'lucide-react';

interface MemoryEntry {
  id: string;
  category: 'user' | 'feedback' | 'project' | 'reference';
  title: string;
  content: string;
  updatedAt: string;
}

const MOCK_MEMORIES: MemoryEntry[] = [
  { id: '1', category: 'project', title: 'Sovereign Grid Deploy', content: 'Deployment to VPS using docker-compose and nginx ingress.', updatedAt: '2026-04-18' },
  { id: '2', category: 'user', title: 'Commander Preference', content: 'Prefers terse responses with no trailing summaries.', updatedAt: '2026-04-19' },
  { id: '3', category: 'feedback', title: 'Integration Testing', content: 'Integration tests must hit real database, not mocks.', updatedAt: '2026-04-20' },
];

export const MemoryViewer: React.FC = () => {
  return (
    <div className="flex flex-col h-full border border-cyan-900/30 bg-black/60 rounded-lg overflow-hidden backdrop-blur-md">
      <div className="flex items-center justify-between px-3 py-2 border-b border-cyan-900/30 bg-black/40">
        <div className="flex items-center gap-2 text-cyan-400">
          <Database size={12} />
          <span className="text-[10px] font-bold tracking-widest uppercase">MEMORY_VIEWER (READ-ONLY)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search size={10} className="absolute left-2 top-1/2 -translate-y-1/2 text-cyan-700" />
            <input
              type="text"
              placeholder="Filter..."
              className="bg-black/60 border border-cyan-900/50 rounded pl-5 pr-2 py-0.5 text-[9px] text-cyan-300 focus:outline-none focus:border-cyan-500 w-24 placeholder:text-cyan-900"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 font-mono space-y-3 custom-scrollbar">
        {MOCK_MEMORIES.map(mem => (
          <div key={mem.id} className="p-2 border border-cyan-900/20 bg-black/40 rounded group hover:border-cyan-500/50 transition-colors">
            <div className="flex items-center justify-between mb-1">
              <span className={`text-[8px] px-1 rounded border ${
                mem.category === 'project' ? 'border-blue-900 text-blue-400' :
                mem.category === 'user' ? 'border-green-900 text-green-400' :
                mem.category === 'feedback' ? 'border-yellow-900 text-yellow-400' : 'border-purple-900 text-purple-400'
              }`}>
                {mem.category.toUpperCase()}
              </span>
              <span className="text-[8px] text-gray-600">{mem.updatedAt}</span>
            </div>
            <div className="text-[10px] font-bold text-white mb-1">{mem.title}</div>
            <div className="text-[9px] text-gray-400 leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all">
              {mem.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
