# Analytics Setup Guide

This guide will help you set up analytics tracking for the Tes Insurance Agency website.

## Available Analytics Providers

### 1. Google Analytics 4 (Recommended)

#### Setup Steps:
1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new GA4 property
3. Get your Measurement ID (format: G-XXXXXXXXXX)
4. Set the environment variable: `VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX`

#### Features:
- Page views tracking
- Custom events
- User behavior analysis
- Conversion tracking
- Real-time data

### 2. Plausible Analytics (Privacy-focused)

#### Setup Steps:
1. Go to [Plausible](https://plausible.io/)
2. Create an account and add your domain
3. Get your domain name
4. Set the environment variable: `VITE_PLAUSIBLE_DOMAIN=yourdomain.com`

#### Features:
- Privacy-focused (GDPR compliant)
- Lightweight (1.4KB)
- Real-time dashboard
- No cookies required

## Environment Variables

Add these to your deployment platform (Vercel, Netlify, etc.):

```bash
# Google Analytics
VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX

# Plausible Analytics
VITE_PLAUSIBLE_DOMAIN=yourdomain.com

# Site Configuration
VITE_AGENCY_NAME=Tes Insurance Agency
VITE_PHONE=215-839-6506
VITE_EMAIL=info@tesinsurance.com
VITE_ADDRESS=6622 Cormorant Pl, Philadelphia, PA 19142
VITE_LICENSE=PA Lic #TBD
VITE_FORMSPREE_ID=xzzaowkq
```

## Tracked Events

The website automatically tracks these events:

### Page Views
- Home page visits
- Quote page visits
- About page visits
- Contact page visits
- Services page visits

### User Interactions
- CTA button clicks
- Phone number clicks
- Email address clicks
- Form submissions
- FAQ interactions

### Form Tracking
- Quote form submissions
- Contact form submissions
- Form field interactions
- Form validation errors

### Engagement Metrics
- Scroll depth (25%, 50%, 75%, 100%)
- Time on page
- Navigation patterns

## Custom Event Tracking

You can add custom tracking to any component:

```javascript
import { trackEvent } from '../lib/analytics.js';

// Track custom events
trackEvent('custom_action', 'Custom Category', 'Custom Label', 1);

// Track CTA clicks
trackCTAClick('Get Quote', 'Hero Section');

// Track form submissions
trackQuoteSubmission(formData);
```

## Testing Analytics

### Google Analytics
1. Install [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna)
2. Open browser dev tools
3. Check the Network tab for GA requests
4. Use GA4 Real-time reports

### Plausible
1. Check the Plausible dashboard
2. Look for real-time visitors
3. Verify events are being tracked

## Privacy Considerations

### GDPR Compliance
- Plausible is GDPR compliant by default
- Google Analytics requires cookie consent
- Both providers respect user privacy

### Cookie Policy
- Plausible: No cookies used
- Google Analytics: Uses cookies for tracking
- Add cookie consent banner if using GA

## Troubleshooting

### Analytics Not Working
1. Check environment variables are set
2. Verify the measurement ID/domain is correct
3. Check browser console for errors
4. Ensure the site is deployed (not localhost)

### Events Not Tracking
1. Check if analytics is enabled
2. Verify event names and parameters
3. Check browser network tab for requests
4. Test in incognito mode

### Performance Impact
- Google Analytics: ~28KB (minified)
- Plausible: ~1.4KB (minified)
- Both are loaded asynchronously

## Advanced Configuration

### Custom Dimensions (Google Analytics)
```javascript
// Track custom dimensions
gtag('config', 'GA_MEASUREMENT_ID', {
  custom_map: {
    'custom_parameter_1': 'form_type',
    'custom_parameter_2': 'user_zip'
  }
});
```

### Goal Setup (Google Analytics)
1. Go to GA4 Admin > Events
2. Mark key events as conversions
3. Set up goals for:
   - Quote form submissions
   - Contact form submissions
   - Phone number clicks

## Support

For issues with analytics setup:
1. Check the browser console for errors
2. Verify environment variables
3. Test with different browsers
4. Check the analytics provider's documentation
