import { motion } from 'framer-motion';

export function KrakenTradingTerminal() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col h-full bg-black/50 backdrop-blur-md rounded-2xl overflow-hidden border border-emerald-500/30 p-4 shadow-[0_0_30px_rgba(16,185,129,0.1)] relative"
    >
      <div className="flex border-b border-emerald-500/20 pb-3 mb-4 items-center justify-between">
        <h2 className="text-emerald-400 font-bold tracking-widest text-sm uppercase flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Kraken Terminal
        </h2>
        <span className="text-xs text-emerald-500/70 font-mono">STATUS: ENGAGED</span>
      </div>

      <div className="flex-1 flex gap-4 h-full">
        {/* Order Book Placeholder */}
        <div className="w-1/3 flex flex-col font-mono text-xs">
          <div className="flex justify-between text-emerald-500/50 mb-2 pb-1 border-b border-emerald-500/10">
            <span>PRICE</span>
            <span>VOL</span>
          </div>
          <div className="space-y-1 text-red-400/80">
            <div className="flex justify-between hover:bg-red-500/10 cursor-pointer"><span>142.15</span><span>1.5k</span></div>
            <div className="flex justify-between hover:bg-red-500/10 cursor-pointer"><span>142.12</span><span>4.2k</span></div>
            <div className="flex justify-between hover:bg-red-500/10 cursor-pointer"><span>142.08</span><span>800</span></div>
          </div>
          <div className="my-2 py-1 border-y border-emerald-500/20 text-emerald-400 text-center text-lg font-bold">
            142.05
          </div>
          <div className="space-y-1 text-emerald-400/80">
            <div className="flex justify-between hover:bg-emerald-500/10 cursor-pointer"><span>142.02</span><span>3.1k</span></div>
            <div className="flex justify-between hover:bg-emerald-500/10 cursor-pointer"><span>141.98</span><span>5.5k</span></div>
            <div className="flex justify-between hover:bg-emerald-500/10 cursor-pointer"><span>141.95</span><span>120</span></div>
          </div>
        </div>

        {/* Chart View Placeholder */}
        <div className="flex-1 bg-black/30 rounded border border-emerald-500/10 relative overflow-hidden flex items-end justify-between p-2">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
          {/* Simple dummy bar chart */}
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${Math.random() * 80 + 10}%` }}
              transition={{ duration: 1, delay: i * 0.05 }}
              className={`w-4 rounded-t ${Math.random() > 0.5 ? 'bg-emerald-500/50' : 'bg-red-500/50'} relative z-10`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
