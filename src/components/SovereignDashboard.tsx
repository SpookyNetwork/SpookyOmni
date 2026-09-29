import React, { useState, useEffect } from 'react';
import { SovereignHUD } from './SovereignHUD';
import { AgentControlPanel } from './AgentControlPanel';
import { TaskExecutionWindow } from './TaskExecutionWindow';
import { MemoryViewer } from './MemoryViewer';

interface SystemStatus {
  neural: { sync: number; latency: number; load: number; entropy: string; mode: string };
  fiscal: { liquidity: string; velocity: string; solvency: string; bridge: string };
  kinetic: { pods: string; io: number; thermals: string; thru: string };
  sovereign: { auth: string; stability: number; threat: string; grid: string };
}

export const SovereignDashboard: React.FC = () => {
  const [status, setStatus] = useState<SystemStatus>({
    neural: { sync: 98, latency: 14, load: 22, entropy: 'LOW', mode: 'SOVEREIGN' },
    fiscal: { liquidity: '$1.2B', velocity: '420', solvency: '99.9%', bridge: 'ACTIVE' },
    kinetic: { pods: '42', io: 12, thermals: 'NOMINAL', thru: '1.2GB/s' },
    sovereign: { auth: 'LEVEL_4', stability: 99, threat: 'MINIMAL', grid: 'SYNCED' },
  });

  const [objective] = useState('Initialize Sovereign Core Interconnect');
  const [progress, setProgress] = useState(65);
  const [lastStrike] = useState('Executed node sync via Satellite-4');
  const [blockers] = useState('None');
  const [telemetry] = useState('All systems nominal');

  // Simulation of real-time updates from /system_status
  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(prev => ({
        ...prev,
        neural: {
          ...prev.neural,
          latency: Math.floor(Math.random() * 20) + 10,
          load: Math.floor(Math.random() * 30) + 15
        },
        kinetic: {
          ...prev.kinetic,
          io: Math.floor(Math.random() * 20) + 5
        }
      }));
      setProgress(p => (p < 100 ? p + 0.1 : 100));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full w-full flex flex-col gap-4 p-4 bg-transparent overflow-hidden">
      {/* TOP: System Health HUD */}
      <div className="shrink-0">
        <SovereignHUD
          status={status}
          objective={objective}
          progress={Math.floor(progress)}
          lastStrike={lastStrike}
          blockers={blockers}
          telemetry={telemetry}
        />
      </div>

      {/* MIDDLE: CORE INTERFACE GRID */}
      <div className="flex-1 grid grid-cols-12 gap-4 min-h-0">

        {/* LEFT: Agent Control Panel */}
        <div className="col-span-3 flex flex-col min-h-0">
          <AgentControlPanel />
        </div>

        {/* CENTER: Task Execution Window */}
        <div className="col-span-6 flex flex-col min-h-0">
          <TaskExecutionWindow />
        </div>

        {/* RIGHT: Memory Viewer */}
        <div className="col-span-3 flex flex-col min-h-0">
          <MemoryViewer />
        </div>

      </div>
    </div>
  );
};
