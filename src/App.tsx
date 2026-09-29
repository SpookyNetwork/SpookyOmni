import { useState } from 'react';
import { AuthGate, useAuth } from './components/AuthGate';
import { SwarmTelemetry } from './components/SwarmTelemetry';
import { SovereignDashboard } from './components/SovereignDashboard';
import "./App.css";

function AppContent() {
  const { features } = useAuth();
  const [activeTab, setActiveTab] = useState<'COMMAND' | 'SWARM' | 'PAY' | 'CLOUD'>('SWARM');

  const renderTab = () => {
    switch (activeTab) {
      case 'COMMAND':
        return <SovereignDashboard />;
      case 'SWARM':
        return (
          <div className="h-full flex flex-col">
            <h2 className="text-xs tracking-widest text-white mb-2">// SWARM_TELEMETRY</h2>
            <SwarmTelemetry />
          </div>
        );
      case 'PAY':
        return (
          <div className="h-full flex items-center justify-center">
             <div className="text-center space-y-4">
                <div className="text-2xl text-cyan-500 animate-pulse">[SPOOKY_PAY_LEDGER]</div>
                <div className="text-xs text-gray-400">Financial Kernel Initializing...</div>
             </div>
          </div>
        );
      case 'CLOUD':
        return (
          <div className="h-full flex flex-col">
             <h2 className="text-xs tracking-widest text-white mb-2">// CLOUD_PROVISIONING</h2>
             {!features.cloud_hosting ? (
                <div className="flex-1 flex items-center justify-center mt-10 border border-red-900/50 rounded bg-red-950/20">
                    <div className="text-red-400 text-xs tracking-widest">ERROR: NOT AUTHORIZED (REQUIRES PRO OR HIGHER)</div>
                </div>
             ) : (
                <div className="flex-1 flex flex-col p-4 border border-cyan-900/30 rounded bg-black/40">
                  <div className="flex items-center justify-between border-b border-cyan-900/30 pb-4 mb-4">
                     <span className="text-xs font-mono text-cyan-300">Active Tenants</span>
                     <button className="bg-cyan-900/50 text-cyan-300 hover:bg-cyan-800 text-[10px] px-3 py-1 rounded">PROVISION NEW</button>
                  </div>
                  <div className="text-center py-10 text-gray-600 text-xs tracking-widest">NO ACTIVE SITES DETECTED</div>
                </div>
             )}
          </div>
        )
    }
  };

  return (
    <div className="h-screen w-screen bg-spooky-bg text-gray-200 font-mono flex flex-col overflow-hidden">

      {/* HEADER / NAVIGATION */}
      <header className="h-14 border-b border-cyan-900/40 bg-black/50 backdrop-blur-xl flex items-center justify-between px-6 pt-2">
        <div className="flex items-center gap-4">
          <div className="text-cyan-500 font-black text-lg tracking-[0.2em] uppercase">SPOOKY<span className="text-white">OS</span></div>
          <div className="flex items-center gap-1 bg-black/40 p-1 rounded border border-cyan-900/30">
            {(['COMMAND', 'SWARM', 'PAY', 'CLOUD'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 text-[10px] uppercase tracking-widest rounded transition-colors ${
                  activeTab === tab
                    ? 'bg-cyan-900/40 text-cyan-300 border border-cyan-800/50'
                    : 'text-gray-500 hover:text-cyan-400 hover:bg-white/5'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* MAIN CONTENT GRID */}
      <main className="flex-1 grid grid-cols-12 gap-4 p-4 overflow-hidden">

        {/* CENTER PANEL (DYNAMIC) */}
        <div className="col-span-12 flex flex-col relative h-full">
           {renderTab()}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="h-6 border-t border-cyan-900/50 bg-black flex items-center overflow-hidden whitespace-nowrap px-4">
        <div className="animate-marquee text-[10px] text-cyan-700 tracking-tighter italic">
          GROUND_NEWS: LUXURY TECH ADOPTION SPIKES IN PACIFIC REALM -- BTC HALVING AFTERMATH PERSISTS -- HAWAII AQUACULTURE REGS UPDATED 2026 -- SPOOKYCLOUD SECURES 3 NEW RETAIL NODES
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AuthGate>
      <AppContent />
    </AuthGate>
  );
}
