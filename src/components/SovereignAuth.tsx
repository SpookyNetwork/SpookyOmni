import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShieldAlert, CheckCircle2, XCircle, Fingerprint, Lock } from "lucide-react";

interface SovereignAuthProps {
  proposal: {
    proposal_id: string;
    action: string;
    risk_level: string;
    details: any;
    matrix?: {
      pros: string[];
      cons: string[];
    };
  };
  onAuthorize: () => void;
  onAbort: () => void;
}

export const SovereignAuth: React.FC<SovereignAuthProps> = ({ proposal, onAuthorize, onAbort }) => {
  const [authProgress, setAuthProgress] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isDone, setIsDone] = useState(false);

  // Default matrix if none provided
  const matrix = proposal.matrix || {
    pros: ["Signal strength > 85%", "Liquidity depth optimal", "Historical pattern alignment"],
    cons: ["Surface Pro NPU at 92%", "Market jitter detected", "Cross-spread latency > 10ms"]
  };

  const handleHold = async () => {
    setIsVerifying(true);
    // Simulate biometric scan
    for (let i = 0; i <= 100; i += 5) {
      setAuthProgress(i);
      await new Promise(r => setTimeout(r, 40));
    }
    setIsDone(true);
    setTimeout(() => {
      onAuthorize();
    }, 800);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[#000B1A]/80 backdrop-blur-2xl p-6"
    >
      <div className="cyber-glass w-full max-w-2xl p-10 rounded-[2rem] border-spooky-accent/30 spatial-depth flex flex-col gap-8">
        {/* HEADER */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-5">
            <div className="p-4 bg-spooky-accent/10 rounded-2xl border border-spooky-accent/20">
              <ShieldAlert className="h-10 w-10 text-spooky-accent animate-pulse" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white tracking-widest uppercase italic">Apex_Auth_Required</h2>
              <p className="text-[10px] text-spooky-accent/40 font-mono tracking-tighter uppercase">Protocol: MK-SOVEREIGN-V4 // Mission: {proposal.proposal_id}</p>
            </div>
          </div>
          <div className="text-right">
             <div className="text-[10px] text-gray-500 font-mono uppercase mb-1">Risk_Tier</div>
             <div className="px-3 py-1 bg-spooky-danger/10 border border-spooky-danger/30 text-spooky-danger font-black text-xs rounded-full">
               {proposal.risk_level}
             </div>
          </div>
        </div>

        {/* DECISION MATRIX */}
        <div className="grid grid-cols-2 gap-6 bg-black/40 p-6 rounded-2xl border border-white/5">
           <div className="space-y-4">
             <div className="flex items-center gap-2 text-emerald-400 font-bold text-[10px] uppercase tracking-widest border-b border-emerald-500/10 pb-2">
               <CheckCircle2 size={14} /> Matrix_Pros
             </div>
             <ul className="space-y-2">
               {matrix.pros.map((p, i) => (
                 <li key={i} className="text-[11px] text-gray-400 font-mono flex gap-2">
                   <span className="text-emerald-500/40">▸</span> {p}
                 </li>
               ))}
             </ul>
           </div>
           <div className="space-y-4 border-l border-white/5 pl-6">
             <div className="flex items-center gap-2 text-spooky-danger font-bold text-[10px] uppercase tracking-widest border-b border-spooky-danger/10 pb-2">
               <XCircle size={14} /> Matrix_Cons
             </div>
             <ul className="space-y-2">
               {matrix.cons.map((c, i) => (
                 <li key={i} className="text-[11px] text-gray-400 font-mono flex gap-2">
                   <span className="text-spooky-danger/40">▸</span> {c}
                 </li>
               ))}
             </ul>
           </div>
        </div>

        {/* AUTH ACTION */}
        <div className="flex flex-col items-center gap-8 mt-4">
           {!isDone ? (
              <div className="flex flex-col items-center gap-4 w-full">
                 <motion.button
                   whileTap={{ scale: 0.95 }}
                   onMouseDown={handleHold}
                   className="relative group w-full py-6 bg-spooky-accent/5 border border-spooky-accent/30 rounded-2xl overflow-hidden hover:bg-spooky-accent/10 transition-all cursor-pointer"
                 >
                    {/* PROGRESS BAR OVERLAY */}
                    <motion.div 
                      className="absolute left-0 top-0 bottom-0 bg-spooky-accent/20"
                      animate={{ width: `${authProgress}%` }}
                    />
                    
                    <div className="relative z-10 flex items-center justify-center gap-4">
                       {isVerifying ? (
                         <>
                           <Fingerprint className="h-6 w-6 text-spooky-accent animate-pulse" />
                           <span className="text-spooky-accent font-black tracking-[0.3em] uppercase">Biometric_Verifying... {authProgress}%</span>
                         </>
                       ) : (
                         <>
                           <Lock className="h-6 w-6 text-spooky-accent group-hover:animate-bounce" />
                           <span className="text-spooky-accent font-black tracking-[0.3em] uppercase">Hold to Authorize Signature</span>
                         </>
                       )}
                    </div>
                 </motion.button>
                 <button 
                  onClick={onAbort}
                  className="text-gray-600 hover:text-spooky-danger transition-colors font-mono text-[10px] uppercase tracking-widest cursor-pointer"
                 >
                   ▸ Abort Mission_Sequence
                 </button>
              </div>
           ) : (
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center gap-2 text-emerald-400"
              >
                  <CheckCircle2 size={48} className="cyber-glow" />
                  <div className="font-black uppercase tracking-[0.5em] text-sm">Signature_Accepted</div>
              </motion.div>
           )}
        </div>
      </div>
    </motion.div>
  );
};
