import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthGate';
import { SpookySocketClientImpl } from '../lib/SpookySocketClient';
import { TelemetryFrame } from '../interfaces/SpookySocket';

// Payload derived from SwarmSocketClient
interface TelemetryData {
  metrics: {
    tps: number;
    volume: number;
    queue_depth: number;
    active_workers: number;
  };
  agents: Array<{
    name: string;
    tier: string;
    status: 'ONLINE' | 'RENTED' | 'OFFLINE';
  }>;
}

export const SwarmTelemetry: React.FC = () => {
  const { tier } = useAuth();
  const [data, setData] = useState<TelemetryData | null>(null);

  useEffect(() => {
    // GAP 3: The Omni-Client WebSocket Command Deck
    // Telemetry feeds are now pushed over WS for real-time plotting.
    const client = new SpookySocketClientImpl();
    
    // Initial static agents roster (mock for now, in prod this comes from /api/agents)
    const initialAgents: TelemetryData['agents'] = [
      { name: 'NYX', tier: 'PLANET', status: 'ONLINE' as const },
      { name: 'KRAKEN', tier: 'SOVEREIGN', status: 'RENTED' as const },
      { name: 'REMY', tier: 'STAR', status: 'OFFLINE' as const },
      { name: 'BEVON', tier: 'STAR', status: 'ONLINE' as const },
    ];

    client.onTelemetry((frame: TelemetryFrame) => {
      setData({
        metrics: {
          tps: frame.tenant_tps_velocity,
          volume: 12500, // volume would be another metric in the future
          queue_depth: frame.tasks_queued,
          active_workers: frame.fleet_active,
        },
        agents: initialAgents, // agents status would ideally also be in the frame
      });
    });

    const connectAndStream = async () => {
      try {
        await client.connect('ultra-token-placeholder'); // In prod, use real serviceToken
      } catch (e) {
        console.error('Failed to connect to Swarm Telemetry WS', e);
      }
    };

    connectAndStream();

    return () => client.close();
  }, [tier]);

  if (!data) return <div className="text-xs text-cyan-700 animate-pulse">CONNECTING TO SWARM...</div>;

  return (
    <div className="h-full flex flex-col space-y-4">
      {/* Metrics Row */}
      <div className="grid grid-cols-4 gap-2">
        <MetricCard label="VELOCITY (TPS)" value={data.metrics.tps.toFixed(2)} />
        <MetricCard label="VOLUME (5M)" value={`$${data.metrics.volume.toFixed(0)}`} />
        <MetricCard label="QUEUE DEPTH" value={data.metrics.queue_depth.toString()} alert={data.metrics.queue_depth > 10} />
        <MetricCard label="WORKERS" value={data.metrics.active_workers.toString()} />
      </div>

      {/* Agent Matrix */}
      <div className="flex-1 cyber-glass rounded-lg border border-cyan-900/30 p-4 flex flex-col">
        <h3 className="text-[10px] text-cyan-600 mb-4 tracking-widest uppercase">// Agent Roster Matrix</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 overflow-y-auto pr-2">
          {data.agents.map((agent) => (
            <AgentCard key={agent.name} agent={agent} />
          ))}
          {/* Fill the rest of the grid with empty slots for aesthetic */}
          {Array.from({ length: 8 }).map((_, i) => (
             <div key={`empty-${i}`} className="border border-cyan-900/10 rounded bg-black/20 h-12 flex items-center justify-center opacity-30">
               <span className="text-[8px] tracking-widest text-cyan-900">SLOT_{i+5}</span>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ label, value, alert = false }: { label: string; value: string; alert?: boolean }) => (
  <div className={`p-3 rounded cyber-glass border ${alert ? 'redline-glow' : 'border-cyan-900/30'}`}>
    <div className="text-[9px] text-gray-500 uppercase tracking-widest mb-1">{label}</div>
    <div className={`text-xl font-mono ${alert ? 'text-red-500 animate-pulse' : 'text-cyan-400'}`}>
      {value}
    </div>
  </div>
);

const AgentCard = ({ agent }: { agent: TelemetryData['agents'][0] }) => {
  const isSignature = agent.tier === 'SOVEREIGN' || agent.tier === 'PLANET';
  const getDotClass = (status: string) => {
    switch (status) {
      case 'ONLINE': return 'agent-dot-online';
      case 'RENTED': return 'agent-dot-rented';
      case 'OFFLINE': return 'agent-dot-offline';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className={`p-2 rounded flex items-center justify-between border ${isSignature ? 'signature-agent' : 'border-cyan-900/40 bg-black/40'}`}>
      <div className="flex flex-col z-10">
        <span className="text-xs font-bold text-white tracking-wider">{agent.name}</span>
        <span className="text-[8px] text-cyan-600 uppercase tracking-widest">{agent.tier}</span>
      </div>
      <div className="flex items-center gap-2 z-10">
        <span className="text-[8px] text-gray-400 uppercase">{agent.status}</span>
        <div className={getDotClass(agent.status)} />
      </div>
    </div>
  );
};
