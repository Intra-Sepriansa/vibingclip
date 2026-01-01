import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.css';
import { AuthProvider, ProjectsProvider } from './context';
import vibingLogo from './assets/vibing-new.png';
import { initFirebase } from './config/firebase';

const existingFavicon = document.querySelector("link[rel~='icon']") as HTMLLinkElement | null;
const favicon = existingFavicon ?? document.createElement('link');
favicon.rel = 'icon';
favicon.href = vibingLogo;
if (!existingFavicon) {
  document.head.appendChild(favicon);
}

// Fire-and-forget; if Firebase is misconfigured we still want the app to load
initFirebase().catch((err) => {
  console.warn('Firebase not initialized:', err?.message || err);
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <ProjectsProvider>
        <App />
      </ProjectsProvider>
    </AuthProvider>
  </React.StrictMode>
);
