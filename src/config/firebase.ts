import { getApps, initializeApp, getApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID ?? '',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID ?? ''
};

const hasConfig = Boolean(
  config.apiKey &&
  config.authDomain &&
  config.projectId &&
  config.storageBucket &&
  config.messagingSenderId &&
  config.appId
);

let appInstance: ReturnType<typeof initializeApp> | null = null;
let analyticsInitialized = false;

export const getFirebaseApp = () => {
  if (!hasConfig) {
    throw new Error('Firebase env vars missing. Set VITE_FIREBASE_* in .env');
  }
  if (appInstance) return appInstance;
  appInstance = getApps().length ? getApp() : initializeApp(config);
  return appInstance;
};

export const getFirebaseAuth = () => getAuth(getFirebaseApp());
export const isFirebaseReady = () => hasConfig;

export const initFirebase = async () => {
  if (!hasConfig) return null;
  const app = getFirebaseApp();
  if (!analyticsInitialized && typeof window !== 'undefined') {
    try {
      if (await isSupported()) {
        getAnalytics(app);
      }
    } catch {
      // ignore analytics failure
    }
    analyticsInitialized = true;
  }
  return app;
};
