// Analytics Configuration
import SITE from '../config/site.js';

export const ANALYTICS_CONFIG = {
  // Google Analytics 4
  googleAnalytics: {
    enabled: !!SITE.GOOGLE_ANALYTICS_ID,
    measurementId: SITE.GOOGLE_ANALYTICS_ID,
    config: {
      page_title: document.title,
      page_location: window.location.href,
      send_page_view: true
    }
  },
  
  // Plausible Analytics
  plausible: {
    enabled: !!SITE.PLAUSIBLE_DOMAIN,
    domain: SITE.PLAUSIBLE_DOMAIN,
    apiHost: 'https://plausible.io'
  },
  
  // Custom tracking events
  events: {
    // Page views
    pageView: (pageName) => ({
      action: 'page_view',
      category: 'Navigation',
      label: pageName,
      value: 1
    }),
    
    // User interactions
    ctaClick: (ctaName, location) => ({
      action: 'cta_click',
      category: 'User Engagement',
      label: `${ctaName} - ${location}`,
      value: 1
    }),
    
    // Form interactions
    formSubmission: (formName, formData) => ({
      action: 'form_submission',
      category: 'Lead Generation',
      label: formName,
      value: 1,
      custom_parameters: {
        form_type: formData?.type || 'unknown',
        zip_code: formData?.zip || 'unknown'
      }
    }),
    
    // Contact interactions
    phoneClick: (phoneNumber, location) => ({
      action: 'phone_click',
      category: 'Contact',
      label: `${phoneNumber} - ${location}`,
      value: 1
    }),
    
    emailClick: (email, location) => ({
      action: 'email_click',
      category: 'Contact',
      label: `${email} - ${location}`,
      value: 1
    }),
    
    // Scroll tracking
    scrollDepth: (percentage) => ({
      action: 'scroll_depth',
      category: 'User Engagement',
      label: `${percentage}%`,
      value: percentage
    }),
    
    // Time on page
    timeOnPage: (seconds) => ({
      action: 'time_on_page',
      category: 'User Engagement',
      label: 'seconds',
      value: seconds
    })
  }
};

// Helper function to check if analytics is enabled
export function isAnalyticsEnabled() {
  return ANALYTICS_CONFIG.googleAnalytics.enabled || ANALYTICS_CONFIG.plausible.enabled;
}

// Helper function to get analytics provider
export function getAnalyticsProvider() {
  if (ANALYTICS_CONFIG.googleAnalytics.enabled) return 'google';
  if (ANALYTICS_CONFIG.plausible.enabled) return 'plausible';
  return 'none';
}
