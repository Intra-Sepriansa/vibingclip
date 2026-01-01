import { ApiError, apiClient } from './apiClient';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { getFirebaseAuth, isFirebaseReady } from '../config/firebase';

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

const TOKEN_KEY = 'vc_access_token';
const REFRESH_KEY = 'vc_refresh_token';
export type AuthUser = { id: string; email: string; name?: string; role?: string };

const getAuthSafe = () => {
  if (!isFirebaseReady()) return null;
  try {
    return getFirebaseAuth();
  } catch (error) {
    console.warn('Firebase init failed:', error);
    return null;
  }
};

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

const getEnvCreds = () => {
  const email = import.meta.env.VITE_DEMO_EMAIL || 'demo@vibingclip.com';
  const password = import.meta.env.VITE_DEMO_PASSWORD || 'demo1234';
  const name = import.meta.env.VITE_DEMO_NAME || 'Vibing Demo';
  return { email, password, name };
};

const persistTokens = (tokens: TokenPair) => {
  localStorage.setItem(TOKEN_KEY, tokens.accessToken);
  localStorage.setItem(REFRESH_KEY, tokens.refreshToken);
  apiClient.setToken(tokens.accessToken);
};

export const authService = {
  loadTokensFromStorage() {
    const token = localStorage.getItem(TOKEN_KEY);
    const refresh = localStorage.getItem(REFRESH_KEY);
    if (token) {
      apiClient.setToken(token);
      return { accessToken: token, refreshToken: refresh };
    }
    return null;
  },

  clearTokens() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
    apiClient.setToken(null);
    const auth = getAuthSafe();
    if (auth) signOut(auth).catch(() => {});
  },

  async login(email: string, password: string): Promise<TokenPair> {
    try {
      const tokens = await apiClient.request<TokenPair>('/auth/login', {
        method: 'POST',
        body: { email, password },
        withAuth: false
      });
      persistTokens(tokens);
      return tokens;
    } catch (err: any) {
      if (err instanceof ApiError && err.status === 0) {
        throw new Error('Backend tidak bisa dihubungi. Jalankan API di http://localhost:4000');
      }
      throw err;
    }
  },

  async register(email: string, password: string, name: string): Promise<TokenPair> {
    try {
      const tokens = await apiClient.request<TokenPair>('/auth/register', {
        method: 'POST',
        body: { email, password, name },
        withAuth: false
      });
      persistTokens(tokens);
      return tokens;
    } catch (err: any) {
      if (err instanceof ApiError && err.status === 0) {
        throw new Error('Backend tidak bisa dihubungi. Jalankan API di http://localhost:4000');
      }
      throw err;
    }
  },

  async loginWithGoogle(): Promise<TokenPair> {
    const auth = getAuthSafe();
    if (!auth) {
      throw new Error('Firebase belum dikonfigurasi. Isi VITE_FIREBASE_* di .env');
    }
    // Use redirect to avoid COOP/popup issues
    await signInWithRedirect(auth, googleProvider);
    throw new Error('Mengarahkan ke Google login...');
  },

  async _bridgeFirebaseUser(user: { uid: string; email: string | null; displayName?: string | null }): Promise<TokenPair> {
    const email = user.email;
    if (!email) throw new Error('Google login failed: no email returned');
    const name = user.displayName || email.split('@')[0];
    const derivedPassword = `google:${user.uid}:${email}`;

    try {
      return await this.register(email, derivedPassword, name);
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        return this.login(email, derivedPassword);
      }
      throw err;
    }
  },

  async consumeGoogleRedirect(): Promise<TokenPair | null> {
    const auth = getAuthSafe();
    if (!auth) return null;
    const result = await getRedirectResult(auth);
    if (!result?.user) return null;
    return this._bridgeFirebaseUser(result.user);
  },

  async loginWithEmailProvider(email: string, password: string): Promise<void> {
    const auth = getAuthSafe();
    if (!auth) throw new Error('Firebase belum dikonfigurasi. Isi VITE_FIREBASE_* di .env');
    await signInWithEmailAndPassword(auth, email, password);
  },

  async registerWithEmailProvider(email: string, password: string): Promise<void> {
    const auth = getAuthSafe();
    if (!auth) throw new Error('Firebase belum dikonfigurasi. Isi VITE_FIREBASE_* di .env');
    await createUserWithEmailAndPassword(auth, email, password);
  },

  async ensureAuth(): Promise<TokenPair> {
    const stored = this.loadTokensFromStorage();
    if (stored?.accessToken) {
      return stored as TokenPair;
    }

    const { email, password, name } = getEnvCreds();
    try {
      return await this.login(email, password);
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        return this.register(email, password, name);
      }
      throw error;
    }
  },

  async me(): Promise<AuthUser> {
    return apiClient.request<AuthUser>('/auth/me', { method: 'GET' });
  }
};
