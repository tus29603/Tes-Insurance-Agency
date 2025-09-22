import { useEffect } from 'react';
import SITE from '../config/site.js';

// Google Analytics component
export function GoogleAnalytics() {
  useEffect(() => {
    if (!SITE.GOOGLE_ANALYTICS_ID) return;

    // Load Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${SITE.GOOGLE_ANALYTICS_ID}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', SITE.GOOGLE_ANALYTICS_ID);

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
    if (!SITE.PLAUSIBLE_DOMAIN) return;

    // Load Plausible script
    const script = document.createElement('script');
    script.defer = true;
    script['data-domain'] = SITE.PLAUSIBLE_DOMAIN;
    script.src = 'https://plausible.io/js/script.js';
    document.head.appendChild(script);

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
