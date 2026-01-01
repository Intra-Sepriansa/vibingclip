import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import { AuthUser, TokenPair, authService } from '../services/authService';
import { isFirebaseReady } from '../config/firebase';

type AuthContextValue = {
  user: AuthUser | null;
  tokens: TokenPair | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [tokens, setTokens] = useState<TokenPair | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto auth on mount
  useEffect(() => {
    const init = async () => {
      try {
        const tokens = await authService.ensureAuth();
        setTokens(tokens);
        const profile = await authService.me();
        setUser(profile);
      } catch (err: any) {
        setError(err?.message || 'Auth failed');
      } finally {
        setIsLoading(false);
      }
    };
    init();
  }, []);

  const hydrateUser = useCallback(async () => {
    try {
      const profile = await authService.me();
      setUser(profile);
      setError(null);
    } catch (err: any) {
      setError(err?.message ?? 'Unable to load user');
      authService.clearTokens();
      setTokens(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // No second bootstrap; handled above

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const pair = await authService.login(email, password);
      setTokens(pair);
      await hydrateUser();
    } catch (err: any) {
      setError(err?.message ?? 'Login failed');
      setIsLoading(false);
      throw err;
    }
  }, [hydrateUser]);

  const loginWithGoogle = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const pair = await authService.loginWithGoogle();
      setTokens(pair);
      await hydrateUser();
    } catch (err: any) {
      setError(err?.message ?? 'Login Google gagal');
      setIsLoading(false);
      throw err;
    }
  }, [hydrateUser]);

  const register = useCallback(async (name: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const pair = await authService.register(email, password, name);
      setTokens(pair);
      await hydrateUser();
    } catch (err: any) {
      setError(err?.message ?? 'Registration failed');
      setIsLoading(false);
      throw err;
    }
  }, [hydrateUser]);

  const logout = useCallback(() => {
    authService.clearTokens();
    setUser(null);
    setTokens(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      tokens,
      isAuthenticated: true,
      isLoading,
      error,
      login,
      register,
      loginWithGoogle,
      logout
    }),
    [user, tokens, isLoading, error, login, register, loginWithGoogle, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
};
