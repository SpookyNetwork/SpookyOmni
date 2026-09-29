import React from 'react';

interface HUDProps {
  status: {
    neural: { sync: number; latency: number; load: number; entropy: string; mode: string };
    fiscal: { liquidity: string; velocity: string; solvency: string; bridge: string };
    kinetic: { pods: string; io: number; thermals: string; thru: string };
    sovereign: { auth: string; stability: number; threat: string; grid: string };
  };
  objective: string;
  progress: number;
  lastStrike: string;
  blockers: string;
  telemetry: string;
}

export const SovereignHUD: React.FC<HUDProps> = ({ status, objective, progress, lastStrike, blockers, telemetry }) => {
  return (
    <div className="w-full font-mono text-[10px] tracking-tighter p-2 border border-cyan-900/50 bg-black/60 backdrop-blur-md rounded-lg shadow-[0_0_15px_rgba(0,255,255,0.1)] text-cyan-400 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500 via-transparent to-transparent"></div>

      <div className="flex justify-between items-center mb-2 border-b border-cyan-900/30 pb-1">
        <div className="flex items-center gap-2">
          <span className="text-white font-bold">🛰️ SOVEREIGN_ENGINE</span>
          <span className="text-cyan-600">// APEX_COMMAND // v7.0_OMEGA</span>
        </div>
        <div className="text-cyan-600 uppercase">[SENSORS: ACTIVE]</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
        <div className="space-y-1">
          <div className="text-cyan-600">🧠 [NEURAL]</div>
          <div className="flex justify-between"><span>SYNC:</span> <span className="text-white">{status.neural.sync}%</span></div>
          <div className="flex justify-between"><span>LATENCY:</span> <span className="text-white">{status.neural.latency}ms</span></div>
          <div className="flex justify-between"><span>LOAD:</span> <span className="text-white">{status.neural.load}%</span></div>
          <div className="flex justify-between"><span>MODE:</span> <span className="text-white">{status.neural.mode}</span></div>
        </div>
        <div className="space-y-1">
          <div className="text-cyan-600">💰 [FISCAL]</div>
          <div className="flex justify-between"><span>LIQ:</span> <span className="text-white">{status.fiscal.liquidity}</span></div>
          <div className="flex justify-between"><span>VEL:</span> <span className="text-white">{status.fiscal.velocity} tx/s</span></div>
          <div className="flex justify-between"><span>SOL:</span> <span className="text-white">{status.fiscal.solvency}</span></div>
          <div className="flex justify-between"><span>BRG:</span> <span className="text-white">{status.fiscal.bridge}</span></div>
        </div>
        <div className="space-y-1">
          <div className="text-cyan-600">⚙️ [KINETIC]</div>
          <div className="flex justify-between"><span>PODS:</span> <span className="text-white">{status.kinetic.pods}/128</span></div>
          <div className="flex justify-between"><span>I/O:</span> <span className="text-white">{status.kinetic.io}%</span></div>
          <div className="flex justify-between"><span>THM:</span> <span className="text-white">{status.kinetic.thermals}</span></div>
          <div className="flex justify-between"><span>THRU:</span> <span className="text-white">{status.kinetic.thru}</span></div>
        </div>
        <div className="space-y-1">
          <div className="text-cyan-600">🛡️ [SOVEREIGN]</div>
          <div className="flex justify-between"><span>AUTH:</span> <span className="text-white">{status.sovereign.auth}</span></div>
          <div className="flex justify-between"><span>STB:</span> <span className="text-white">{status.sovereign.stability}%</span></div>
          <div className="flex justify-between"><span>THRT:</span> <span className="text-white">{status.sovereign.threat}</span></div>
          <div className="flex justify-between"><span>GRD:</span> <span className="text-white">{status.sovereign.grid}</span></div>
        </div>
      </div>

      <div className="border-t border-cyan-900/30 pt-2 space-y-2">
        <div className="flex items-center gap-3">
          <div className="text-cyan-600 whitespace-nowrap">🎯 OBJECTIVE:</div>
          <div className="text-white flex-1 truncate">{objective}</div>
          <div className="text-cyan-600 whitespace-nowrap">PROGRESS:</div>
          <div className="w-32 h-3 bg-cyan-950 border border-cyan-900 rounded overflow-hidden relative">
             <div className="h-full bg-cyan-500 transition-all duration-500" style={{ width: `${progress}%` }}></div>
             <div className="absolute inset-0 flex items-center justify-center text-[8px] text-white font-bold">{progress}%</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-[9px]">
          <div className="flex items-center gap-2">
            <span className="text-cyan-600">⚡ LAST_STRIKE:</span>
            <span className="text-white truncate">{lastStrike}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-cyan-600">🚧 BLOCKERS:</span>
            <span className="text-red-400 truncate">{blockers}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-cyan-600">📡 TELEMETRY:</span>
            <span className="text-white truncate">{telemetry}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
