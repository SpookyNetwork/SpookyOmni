import React from 'react';
import { Bot } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'idle' | 'busy';
  load: number;
}

const AGENTS: Agent[] = [
  { id: 'orchestrator', name: 'ORCHESTRATOR', role: 'System Coordinator', status: 'active', load: 12 },
  { id: 'automation', name: 'AUTO_ENG', role: 'Infra/CI/CD', status: 'idle', load: 0 },
  { id: 'cyber', name: 'CYBER_SPEC', role: 'Security/VPN', status: 'busy', load: 84 },
  { id: 'revenue', name: 'REV_STRAT', role: 'Monetization', status: 'idle', load: 0 },
];

export const AgentControlPanel: React.FC = () => {
  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex items-center justify-between border-b border-cyan-900/30 pb-2">
        <h3 className="text-[10px] text-cyan-400 font-bold tracking-widest uppercase flex items-center gap-2">
          <Bot size={12} /> AGENT_CONTROL_PANEL
        </h3>
        <div className="text-[9px] text-cyan-600 animate-pulse">SENSORS_SYNCED</div>
      </div>

      <div className="grid grid-cols-1 gap-2 overflow-y-auto pr-2">
        {AGENTS.map(agent => (
          <div
            key={agent.id}
            className="group p-2 border border-cyan-900/30 bg-black/40 hover:bg-cyan-900/20 rounded transition-all cursor-pointer relative overflow-hidden"
          >
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${
                  agent.status === 'active' ? 'bg-green-500 shadow-[0_0_5px_#22c55e]' :
                  agent.status === 'busy' ? 'bg-yellow-500 shadow-[0_0_5px_#eab308]' : 'bg-gray-600'
                }`} />
                <div>
                  <div className="text-[10px] font-bold text-white">{agent.name}</div>
                  <div className="text-[8px] text-cyan-600">{agent.role}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[9px] text-gray-400">{agent.load}% LOAD</div>
              </div>
            </div>

            {/* Progress Bar for Load */}
            <div className="absolute bottom-0 left-0 h-0.5 bg-cyan-500 transition-all duration-500" style={{ width: `${agent.load}%` }} />
          </div>
        ))}
      </div>
    </div>
  );
};
