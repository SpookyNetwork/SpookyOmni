import React, { useState } from 'react';
import { Terminal, Send, Trash2 } from 'lucide-react';

interface LogEntry {
  timestamp: string;
  agent: string;
  message: string;
  type: 'info' | 'warn' | 'error' | 'success';
}

export const TaskExecutionWindow: React.FC = () => {
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState<LogEntry[]>([
    { timestamp: '12:00:01', agent: 'SYSTEM', message: 'Sovereign Core initialized.', type: 'info' },
    { timestamp: '12:00:05', agent: 'ORCHESTRATOR', message: 'Awaiting command input...', type: 'info' },
  ]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newLog: LogEntry = {
      timestamp: new Date().toLocaleTimeString([], { hour12: false }),
      agent: 'USER',
      message: input,
      type: 'info',
    };

    setLogs([...logs, newLog]);
    setInput('');

    // Simulate response
    setTimeout(() => {
      setLogs(prev => [...prev, {
        timestamp: new Date().toLocaleTimeString([], { hour12: false }),
        agent: 'ORCHESTRATOR',
        message: `Executing: ${input}...`,
        type: 'success',
      }]);
    }, 600);
  };

  return (
    <div className="flex flex-col h-full border border-cyan-900/30 bg-black/60 rounded-lg overflow-hidden backdrop-blur-md">
      <div className="flex items-center justify-between px-3 py-2 border-b border-cyan-900/30 bg-black/40">
        <div className="flex items-center gap-2 text-cyan-400">
          <Terminal size={12} />
          <span className="text-[10px] font-bold tracking-widest uppercase">TASK_EXECUTION_WINDOW</span>
        </div>
        <button
          onClick={() => setLogs([])}
          className="text-gray-500 hover:text-red-400 transition-colors"
          title="Clear Logs"
        >
          <Trash2 size={12} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 font-mono text-[11px] space-y-1 custom-scrollbar">
        {logs.map((log, i) => (
          <div key={i} className="flex gap-3 animate-in fade-in slide-in-from-left-1 duration-300">
            <span className="text-gray-600 shrink-0">[{log.timestamp}]</span>
            <span className={`shrink-0 font-bold ${
              log.agent === 'USER' ? 'text-white' : 'text-cyan-500'
            }`}>
              {log.agent}:
            </span>
            <span className={`break-all ${
              log.type === 'error' ? 'text-red-400' :
              log.type === 'warn' ? 'text-yellow-400' :
              log.type === 'success' ? 'text-green-400' : 'text-gray-300'
            }`}>
              {log.message}
            </span>
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-cyan-900/30 bg-black/40 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Enter sovereign command..."
          className="flex-1 bg-black/60 border border-cyan-900/50 rounded px-3 py-1.5 text-[11px] text-cyan-300 focus:outline-none focus:border-cyan-500 transition-colors placeholder:text-cyan-900"
        />
        <button
          onClick={handleSend}
          className="bg-cyan-900/40 hover:bg-cyan-800 text-cyan-300 p-1.5 rounded border border-cyan-800/50 transition-all active:scale-95"
        >
          <Send size={14} />
        </button>
      </div>
    </div>
  );
};
