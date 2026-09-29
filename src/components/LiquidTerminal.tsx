import React, { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';

export const LiquidTerminal: React.FC = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<Terminal | null>(null);

  useEffect(() => {
    if (!terminalRef.current) return;

    const term = new Terminal({
      theme: {
        background: 'transparent',
        foreground: '#00F2FF',
        cursor: '#00F2FF',
        selectionBackground: 'rgba(0, 242, 255, 0.3)',
        black: '#010410',
        red: '#ff2d55',
        green: '#00ff00',
        yellow: '#ffff00',
        blue: '#4169e1',
        magenta: '#ff00ff',
        cyan: '#00f2ff',
        white: '#ffffff',
      },
      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      fontSize: 12,
      cursorBlink: true,
      allowTransparency: true,
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);

    term.open(terminalRef.current);
    fitAddon.fit();

    term.writeln('\x1b[1;36m[KRAKEN OS] Neural Bridge Linked.\x1b[0m');
    term.writeln('\x1b[2m> Establishing encrypted tunnel to Milwaukee Core...\x1b[0m');
    term.writeln('\x1b[1;32m> CORE_STATUS: NOMINAL\x1b[0m\r\n');
    term.write('\x1b[1;34mmiker@milwaukee-core\x1b[0m:\x1b[1;32m~/SpookySystem\x1b[0m$ ');

    xtermRef.current = term;

    const handleResize = () => fitAddon.fit();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      term.dispose();
    };
  }, []);

  return (
    <div className="flex-1 cyber-glass rounded-xl overflow-hidden flex flex-col border border-spooky-accent/10 shadow-2xl">
      <div className="bg-spooky-surface/40 px-4 py-2 border-b border-spooky-accent/10 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-spooky-accent animate-pulse"></div>
          <span className="text-[10px] font-bold tracking-[0.2em] text-spooky-accent/80 uppercase">
            Neural_Overhead_Terminal
          </span>
        </div>
      </div>
      <div className="flex-1 p-3 bg-black/20" ref={terminalRef} />
    </div>
  );
};
