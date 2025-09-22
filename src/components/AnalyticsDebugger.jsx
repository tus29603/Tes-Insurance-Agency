import React, { useState, useEffect } from 'react';
import { ANALYTICS_CONFIG, isAnalyticsEnabled, getAnalyticsProvider } from '../lib/analytics-config.js';

export default function AnalyticsDebugger({ show = false }) {
  const [events, setEvents] = useState([]);
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    if (!isVisible) return;

    // Listen for custom analytics events
    const handleAnalyticsEvent = (event) => {
      setEvents(prev => [...prev.slice(-9), {
        timestamp: new Date().toLocaleTimeString(),
        action: event.detail?.action || 'unknown',
        category: event.detail?.category || 'unknown',
        label: event.detail?.label || 'unknown',
        value: event.detail?.value || 0
      }]);
    };

    window.addEventListener('analytics-event', handleAnalyticsEvent);
    return () => window.removeEventListener('analytics-event', handleAnalyticsEvent);
  }, [isVisible]);

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 left-4 z-50 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700 transition-colors"
        title="Show Analytics Debugger"
      >
        📊
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-white border border-gray-300 rounded-lg shadow-lg p-4 max-w-sm">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-gray-800">Analytics Debugger</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
      
      <div className="space-y-2 text-sm">
        <div>
          <span className="font-medium">Provider:</span> {getAnalyticsProvider()}
        </div>
        <div>
          <span className="font-medium">Enabled:</span> {isAnalyticsEnabled() ? 'Yes' : 'No'}
        </div>
        
        {ANALYTICS_CONFIG.googleAnalytics.enabled && (
          <div>
            <span className="font-medium">GA ID:</span> {ANALYTICS_CONFIG.googleAnalytics.measurementId}
          </div>
        )}
        
        {ANALYTICS_CONFIG.plausible.enabled && (
          <div>
            <span className="font-medium">Plausible Domain:</span> {ANALYTICS_CONFIG.plausible.domain}
          </div>
        )}
      </div>

      {events.length > 0 && (
        <div className="mt-3">
          <h4 className="font-medium text-gray-800 mb-2">Recent Events:</h4>
          <div className="max-h-32 overflow-y-auto space-y-1">
            {events.map((event, index) => (
              <div key={index} className="text-xs bg-gray-100 p-2 rounded">
                <div className="font-medium">{event.action}</div>
                <div className="text-gray-600">{event.category} - {event.label}</div>
                <div className="text-gray-500">{event.timestamp}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
