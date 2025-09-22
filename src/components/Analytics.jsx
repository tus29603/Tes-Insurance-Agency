import { useEffect } from 'react';
import SITE from '../config/site.js';
import { ANALYTICS_CONFIG } from '../lib/analytics-config.js';

// Google Analytics component
export function GoogleAnalytics() {
  useEffect(() => {
    if (!ANALYTICS_CONFIG.googleAnalytics.enabled) {
      console.log('Google Analytics not enabled - no measurement ID provided');
      return;
    }

    try {
      // Load Google Analytics script
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${SITE.GOOGLE_ANALYTICS_ID}`;
      script.onerror = () => console.error('Failed to load Google Analytics script');
      document.head.appendChild(script);

      // Initialize gtag
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', SITE.GOOGLE_ANALYTICS_ID, ANALYTICS_CONFIG.googleAnalytics.config);

      console.log('Google Analytics initialized successfully');
    } catch (error) {
      console.error('Error initializing Google Analytics:', error);
    }

    return () => {
      // Cleanup
      const scripts = document.querySelectorAll(`script[src*="googletagmanager"]`);
      scripts.forEach(s => s.remove());
    };
  }, []);

  return null;
}

// Plausible Analytics component
export function PlausibleAnalytics() {
  useEffect(() => {
    if (!ANALYTICS_CONFIG.plausible.enabled) {
      console.log('Plausible Analytics not enabled - no domain provided');
      return;
    }

    try {
      // Load Plausible script
      const script = document.createElement('script');
      script.defer = true;
      script['data-domain'] = SITE.PLAUSIBLE_DOMAIN;
      script.src = `${ANALYTICS_CONFIG.plausible.apiHost}/js/script.js`;
      script.onerror = () => console.error('Failed to load Plausible Analytics script');
      document.head.appendChild(script);

      console.log('Plausible Analytics initialized successfully');
    } catch (error) {
      console.error('Error initializing Plausible Analytics:', error);
    }

    return () => {
      // Cleanup
      const scripts = document.querySelectorAll(`script[src*="plausible.io"]`);
      scripts.forEach(s => s.remove());
    };
  }, []);

  return null;
}

// Main Analytics component that loads the appropriate analytics
export default function Analytics() {
  return (
    <>
      <GoogleAnalytics />
      <PlausibleAnalytics />
    </>
  );
}
