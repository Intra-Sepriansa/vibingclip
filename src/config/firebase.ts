import { getApps, initializeApp, getApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

const fallbackConfig = {
  apiKey: 'REDACTED_FIREBASE_API_KEY',
  authDomain: 'your-project.firebaseapp.com',
  projectId: 'vibingclip',
  storageBucket: 'your-project.appspot.com',
  messagingSenderId: 'REDACTED_FIREBASE_SENDER_ID',
  appId: 'REDACTED_FIREBASE_APP_ID',
  measurementId: 'REDACTED_FIREBASE_MEASUREMENT_ID'
};

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || fallbackConfig.apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || fallbackConfig.authDomain,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || fallbackConfig.projectId,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || fallbackConfig.storageBucket,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || fallbackConfig.messagingSenderId,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || fallbackConfig.appId,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || fallbackConfig.measurementId
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
