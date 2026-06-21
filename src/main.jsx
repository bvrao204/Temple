import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Register service worker for Progressive Web App (PWA) support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    if (import.meta.env.DEV) {
      // In development, unregister any existing service workers to prevent aggressive caching
      navigator.serviceWorker.getRegistrations().then(registrations => {
        for (let registration of registrations) {
          registration.unregister();
          console.log('Service Worker unregistered for development');
        }
      });
    } else {
      const swUrl = `${import.meta.env.BASE_URL}sw.js`;
      navigator.serviceWorker.register(swUrl)
        .then(reg => {
          console.log('Service Worker registered successfully with scope:', reg.scope);
        })
        .catch(err => {
          console.error('Service Worker registration failed:', err);
        });
    }
  });
}

