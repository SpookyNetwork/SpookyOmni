import React from 'react';
import { motion } from 'framer-motion';
import { identities, type Identity } from './tokens';

interface GlowStreamProps {
  identity: Identity;
  className?: string;
}

export const GlowStream: React.FC<GlowStreamProps> = ({ identity, className = '' }) => {
  const theme = identities[identity];

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent, ${theme.primary}, transparent)`,
          width: '50%',
          height: '2px',
          opacity: 0.6,
        }}
      />
    </div>
  );
};
