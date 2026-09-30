import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BubbleCursorProps {
  className?: string;
}

export const BubbleCursor: React.FC<BubbleCursorProps> = ({ className = '' }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [clicks, setClicks] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = (e: MouseEvent) => {
      setClicks((prev) => [
        ...prev,
        { id: Date.now(), x: e.clientX, y: e.clientY },
      ]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return (
    <div className={`pointer-events-none fixed inset-0 z-50 overflow-hidden ${className}`}>
      <motion.div
        className="absolute w-8 h-8 rounded-full border border-cyan-400/40 bg-cyan-500/10 backdrop-blur-[1px]"
        animate={{
          x: mousePos.x - 16,
          y: mousePos.y - 16,
        }}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 250,
          mass: 0.5,
        }}
      />
      <AnimatePresence>
        {clicks.map((click) => (
          <motion.div
            key={click.id}
            initial={{ scale: 0, opacity: 1, x: click.x - 20, y: click.y - 20 }}
            animate={{ scale: 2.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            onAnimationComplete={() => {
              setClicks((prev) => prev.filter((c) => c.id !== click.id));
            }}
            className="absolute w-10 h-10 rounded-full border border-cyan-300 bg-cyan-400/20"
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
