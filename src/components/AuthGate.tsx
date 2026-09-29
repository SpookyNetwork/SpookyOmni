import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';

interface AuthState {
  authenticated: boolean;
  tenantId: string | null;
  tier: 'STARTER' | 'PRO' | 'SUPER' | 'ULTRA' | null;
  balance: number;
  features: {
    kraken_feed: boolean;
    hawaii_auction: boolean;
    notion_sync: boolean;
    cloud_hosting: boolean;
  };
}

const AuthContext = createContext<AuthState>({
  authenticated: false,
  tenantId: null,
  tier: null,
  balance: 0,
  features: { kraken_feed: false, hawaii_auction: false, notion_sync: false, cloud_hosting: false },
});

export const useAuth = () => useContext(AuthContext);

const TIER_CONFIG = {
  STARTER: { badge: 'tier-badge-starter', label: 'STARTER', features: { kraken_feed: false, hawaii_auction: false, notion_sync: false, cloud_hosting: false } },
  PRO:     { badge: 'tier-badge-pro',     label: 'PRO',     features: { kraken_feed: false, hawaii_auction: false, notion_sync: true,  cloud_hosting: true  } },
  SUPER:   { badge: 'tier-badge-super',   label: 'SUPER',   features: { kraken_feed: true,  hawaii_auction: false, notion_sync: true,  cloud_hosting: true  } },
  ULTRA:   { badge: 'tier-badge-ultra',    label: 'ULTRA',   features: { kraken_feed: true,  hawaii_auction: true,  notion_sync: true,  cloud_hosting: true  } },
};

const API_BASE = 'http://localhost:8001';

interface AuthGateProps {
  children: ReactNode;
}

export const AuthGate: React.FC<AuthGateProps> = ({ children }) => {
  const [apiKey, setApiKey] = useState('');
  const [auth, setAuth] = useState<AuthState>({
    authenticated: false, tenantId: null, tier: null, balance: 0,
    features: { kraken_feed: false, hawaii_auction: false, notion_sync: false, cloud_hosting: false },
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Check for stored key on mount
  useEffect(() => {
    const stored = localStorage.getItem('spooky_api_key');
    if (stored) {
      authenticate(stored);
    }
  }, []);

  const authenticate = async (key: string) => {
    setLoading(true);
    setError('');
    try {
      const resp = await fetch(`${API_BASE}/api/accounts/`, {
        headers: { 'X-API-Key': key },
      });

      if (resp.status === 401) {
        setError('Invalid API key. Access denied.');
        setLoading(false);
        return;
      }

      if (!resp.ok) {
        setError(`Server error (${resp.status}). Try again later.`);
        setLoading(false);
        return;
      }

      const accounts = await resp.json();
      const primaryAccount = accounts[0];

      if (!primaryAccount) {
        setError('No account found for this key.');
        setLoading(false);
        return;
      }

      // Tier and features come from server response — never trusted from client input
      const tier = primaryAccount.tier || 'STARTER';
      const tierConfig = TIER_CONFIG[tier as keyof typeof TIER_CONFIG] || TIER_CONFIG.STARTER;

      setAuth({
        authenticated: true,
        tenantId: primaryAccount.tenant_id || null,
        tier: tier as AuthState['tier'],
        balance: primaryAccount.balance || 0,
        features: tierConfig.features,
      });

      localStorage.setItem('spooky_api_key', key);
    } catch (e) {
      setError('Connection failed. Is SpookyPay running?');
    }
    setLoading(false);
  };

  const logout = () => {
    setAuth({
      authenticated: false, tenantId: null, tier: null, balance: 0,
      features: { kraken_feed: false, hawaii_auction: false, notion_sync: false, cloud_hosting: false },
    });
    localStorage.removeItem('spooky_api_key');
  };

  // ── SOVEREIGN LOGIN GATE ──
  if (!auth.authenticated) {
    return (
      <div className="h-screen w-screen bg-spooky-bg flex items-center justify-center">
        <div className="cyber-glass rounded-2xl p-10 max-w-md w-full mx-4 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="text-[10px] tracking-[0.4em] text-spooky-accent uppercase font-black">
              Spooky Network
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Sovereign Access Gate
            </h1>
            <p className="text-xs text-gray-500">
              Authenticate with your SpookyPay API key to enter the Command Deck.
            </p>
          </div>

          {/* Input */}
          <div className="space-y-3">
            <input
              type="password"
              id="auth-api-key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && authenticate(apiKey)}
              placeholder="sk_live_..."
              className="w-full bg-black/40 border border-spooky-accent/20 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-spooky-accent focus:outline-none transition-colors font-mono"
            />
            {error && (
              <div className="text-xs text-red-400 bg-red-900/20 px-3 py-2 rounded border border-red-800/30">
                {error}
              </div>
            )}
          </div>

          {/* Button */}
          <button
            id="auth-submit"
            onClick={() => authenticate(apiKey)}
            disabled={loading || !apiKey}
            className="w-full bg-spooky-accent/10 border border-spooky-accent/30 text-spooky-accent font-bold py-3 rounded-lg text-sm uppercase tracking-widest hover:bg-spooky-accent/20 hover:border-spooky-accent/50 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {loading ? 'AUTHENTICATING...' : 'ENTER THE MESH'}
          </button>

          {/* Dev bypass — only available in development builds.
              Sets unauthenticated dev state; gated features will show as locked. */}
          {import.meta.env.DEV && (
            <div className="text-center">
              <button
                onClick={() => {
                  setAuth({
                    authenticated: true,
                    tenantId: 'dev-mode',
                    tier: 'STARTER',
                    balance: 0,
                    features: {
                      kraken_feed: false,
                      hawaii_auction: false,
                      notion_sync: false,
                      cloud_hosting: false,
                    },
                  });
                }}
                className="text-[9px] text-gray-700 hover:text-gray-500 uppercase tracking-widest"
              >
                [DEV_MODE — NO SERVER VALIDATION]
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── AUTHENTICATED: Render children with context ──
  return (
    <AuthContext.Provider value={auth}>
      {/* Tier badge header bar */}
      <div className="fixed top-0 right-0 z-50 p-2 flex items-center gap-2">
        <span className={`tier-badge ${TIER_CONFIG[auth.tier!]?.badge}`}>
          {auth.tier}
        </span>
        <span className="text-[9px] text-gray-500 font-mono">
          ${auth.balance.toLocaleString()}
        </span>
        <button
          onClick={logout}
          className="text-[8px] text-gray-700 hover:text-red-400 uppercase tracking-widest"
        >
          [EXIT]
        </button>
      </div>
      {children}
    </AuthContext.Provider>
  );
};
