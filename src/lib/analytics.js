// Analytics tracking utilities

// Track events for Google Analytics
export function trackEvent(action, category = 'User Interaction', label = '', value = 0) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value
    });
  }
}

// Track page views
export function trackPageView(pageName) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', window.gtag.config?.id, {
      page_title: pageName,
      page_location: window.location.href
    });
  }
}

// Track quote form submissions
export function trackQuoteSubmission(formData) {
  trackEvent('quote_submission', 'Lead Generation', 'Quote Form', 1);
  
  // Track specific form fields for better analytics
  if (formData.type) {
    trackEvent('quote_type_selected', 'Lead Generation', formData.type, 1);
  }
  
  if (formData.zip) {
    trackEvent('quote_zip_entered', 'Lead Generation', formData.zip, 1);
  }
}

// Track CTA clicks
export function trackCTAClick(ctaName, location = 'Unknown') {
  trackEvent('cta_click', 'User Engagement', `${ctaName} - ${location}`, 1);
}

// Track phone number clicks
export function trackPhoneClick(phoneNumber, location = 'Unknown') {
  trackEvent('phone_click', 'Contact', `${phoneNumber} - ${location}`, 1);
}

// Track email clicks
export function trackEmailClick(email, location = 'Unknown') {
  trackEvent('email_click', 'Contact', `${email} - ${location}`, 1);
}

// Track form interactions
export function trackFormInteraction(formName, fieldName, action = 'interaction') {
  trackEvent('form_interaction', 'User Engagement', `${formName} - ${fieldName} - ${action}`, 1);
}

// Track navigation
export function trackNavigation(destination, source = 'Unknown') {
  trackEvent('navigation', 'User Engagement', `${source} to ${destination}`, 1);
}

// Track scroll depth
export function trackScrollDepth(percentage) {
  if (percentage % 25 === 0) { // Track at 25%, 50%, 75%, 100%
    trackEvent('scroll_depth', 'User Engagement', `${percentage}%`, percentage);
  }
}

// Track time on page
export function trackTimeOnPage(timeInSeconds) {
  trackEvent('time_on_page', 'User Engagement', 'seconds', timeInSeconds);
}
