let anonId = localStorage.getItem('anon_id') || crypto.randomUUID();
localStorage.setItem('anon_id', anonId);

export function trackEvent(event: string, properties: Record<string, any> = {}) {
  // Send to PostHog, Sentry, or local fallback
  // Example: fetch('/api/analytics', { method: 'POST', body: JSON.stringify({ event, properties, anonId }) });
  console.log('[trackEvent]', event, properties, anonId);
}
