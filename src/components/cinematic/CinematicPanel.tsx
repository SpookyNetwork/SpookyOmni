import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { identities, shadows, type Identity } from './tokens';

interface CinematicPanelProps {
  identity: Identity;
  children: React.ReactNode;
  className?: string;
  parallaxIntensity?: number;
}

export const CinematicPanel: React.FC<CinematicPanelProps> = ({
  identity,
  children,
  className = '',
  parallaxIntensity = 10,
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [parallaxIntensity, -parallaxIntensity]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-parallaxIntensity, parallaxIntensity]);

  const theme = identities[identity];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set(e.clientX / innerWidth - 0.5);
      mouseY.set(e.clientY / innerHeight - 0.5);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        boxShadow: shadows.glass,
        borderColor: theme.border,
        backgroundColor: theme.glass,
      }}
      className={`relative backdrop-blur-xl border rounded-2xl p-6 transition-colors duration-500 ${className}`}
    >
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-40 mix-blend-overlay"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${theme.glow}, transparent 70%)`,
        }}
      />
      <div style={{ transform: 'translateZ(20px)' }}>{children}</div>
    </motion.div>
  );
};
