import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { readTextFile, BaseDirectory } from '@tauri-apps/plugin-fs';
import { BiolumeLayer, BubbleCursor, CinematicPanel, GlowStream } from './cinematic';

interface MetricsData {
  sales_today?: number;
  inventory?: Record<string, number>;
  water_quality?: Record<string, string | number>;
}

export function SpookyCoralsDashboard() {
  const [metrics, setMetrics] = useState<MetricsData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadMetrics() {
      try {
        const contents = await readTextFile('SpookyCorals/metrics.json', { baseDir: BaseDirectory.Document });
        const parsed = JSON.parse(contents);
        setMetrics(parsed);
      } catch (e: unknown) {
        const errorMessage = e instanceof Error ? e.message : String(e);
        console.error("FS Protocol Error:", errorMessage);
        setError(errorMessage);
      }
    }
    loadMetrics();
    const interval = setInterval(loadMetrics, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      <BubbleCursor />
      <BiolumeLayer identity="corals" />
      <GlowStream identity="corals" className="absolute top-1/2 left-0 w-full opacity-50" />
      <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
        <CinematicPanel identity="corals" parallaxIntensity={15}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="bg-black/40 backdrop-blur-md rounded-2xl border border-cyan-500/30 p-4 relative overflow-hidden group shadow-[0_0_20px_rgba(6,182,212,0.1)]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent pointer-events-none" />

            <div className="flex border-b border-cyan-500/20 pb-3 mb-4 items-center justify-between">
              <h2 className="text-cyan-400 font-bold tracking-widest text-sm uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-sm bg-cyan-500 animate-pulse" />
                SpookyCorals Intelligence
              </h2>
              <span className="text-[10px] text-cyan-500/70 border border-cyan-500/30 px-2 py-0.5 rounded">FS_BRIDGE: SECURE</span>
            </div>

            <div className="space-y-4 font-mono text-sm relative z-10">
              {error ? (
                <div className="text-red-400 text-xs bg-red-400/10 p-2 rounded">
                  [FS_ERROR] {error}
                </div>
              ) : !metrics ? (
                <div className="text-cyan-500/50 animate-pulse">Scanning local filesystem for metrics...</div>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-black/50 p-2 rounded border border-cyan-500/10">
                      <div className="text-cyan-500/50 text-[10px] uppercase mb-1">Sales Today</div>
                      <div className="text-cyan-400 text-lg font-bold">${metrics.sales_today?.toFixed(2) ?? '0.00'}</div>
                    </div>
                    <div className="bg-black/50 p-2 rounded border border-cyan-500/10">
                      <div className="text-cyan-500/50 text-[10px] uppercase mb-1">Inventory Size</div>
                      <div className="text-cyan-400 text-lg font-bold">
                        {Object.values(metrics.inventory || {}).reduce((sum: number, val) => sum + (typeof val === 'number' ? val : 0), 0)} Units
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-cyan-500/50 text-[10px] uppercase mb-2">Water Quality Telemetry</div>
                    <div className="space-y-1">
                      {Object.entries(metrics.water_quality || {}).map(([key, val]) => (
                        <div key={key} className="flex justify-between items-center text-xs">
                          <span className="text-cyan-100/70 capitalize">{key}</span>
                          <span className="text-cyan-400 font-bold">{String(val)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </CinematicPanel>
      </div>
    </div>
  );
}
