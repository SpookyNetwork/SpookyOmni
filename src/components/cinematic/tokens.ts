export type Identity = 'corals' | 'kraken' | 'network';

export const identities: Record<Identity, { primary: string; glow: string; glass: string; border: string }> = {
  corals: {
    primary: '#00d1ff',
    glow: 'rgba(0, 209, 255, 0.3)',
    glass: 'rgba(10, 20, 30, 0.6)',
    border: 'rgba(0, 209, 255, 0.2)',
  },
  kraken: {
    primary: '#00ffa3',
    glow: 'rgba(0, 255, 163, 0.3)',
    glass: 'rgba(10, 20, 30, 0.6)',
    border: 'rgba(0, 255, 163, 0.2)',
  },
  network: {
    primary: '#ffffff',
    glow: 'rgba(255, 255, 255, 0.3)',
    glass: 'rgba(10, 20, 30, 0.6)',
    border: 'rgba(255, 255, 255, 0.2)',
  },
};

export const colors = {
  c0: '#05070a',
  c1: '#0e121a',
  c2: '#141a26',
  c3: '#1a2233',
  accent: '#00ffa3',
  accentGlow: 'rgba(0, 255, 163, 0.3)',
  accent2: '#00d1ff',
  warn: '#ffb800',
  danger: '#ff4b4b',
  success: '#00ffa3',
  text1: '#f8fafc',
  text2: '#94a3b8',
  text3: '#475569',
  border: '#1e293b',
};

export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  glass: '0 -10px 30px rgba(0,0,0,0.5)',
  glassMobile: '0 -5px 15px rgba(0,0,0,0.3)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -3px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
};
