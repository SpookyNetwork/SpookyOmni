import React from 'react';
import { motion } from 'framer-motion';
import { identities, type Identity } from './tokens';

interface BiolumeLayerProps {
  identity: Identity;
  className?: string;
}

export const BiolumeLayer: React.FC<BiolumeLayerProps> = ({ identity, className = '' }) => {
  const theme = identities[identity];

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, Math.random() * 50 - 25, 0],
            y: [0, Math.random() * 50 - 25, 0],
          }}
          transition={{
            duration: 5 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute rounded-full blur-3xl"
          style={{
            width: `${Math.random() * 300 + 200}px`,
            height: `${Math.random() * 300 + 200}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            backgroundColor: theme.glow,
            filter: 'blur(60px)',
          }}
        />
      ))}
    </div>
  );
};
