import fs from 'fs';
export function trackEvent(event: string, properties: Record<string, any> = {}) {
  // Send to PostHog, Sentry, or append to local file
  fs.appendFileSync('analytics.log', JSON.stringify({ event, properties, ts: Date.now() }) + '\n');
}
