// Minimal fetch helper for Replit's REST. Uses a token provided at runtime.
// In production: proxy via your server. This client-only call is for testing.
export async function fetchReplit({
  token,
  path,
  body,
  method = 'POST',
}: {
  token: string;
  path: string; // e.g. '/v0/repls/file/get'
  body?: Record<string, any>;
  method?: 'GET' | 'POST';
}) {
  if (!token) throw new Error('Missing Replit token');
  const base = 'https://replit.com/api';
  const url = `${base}${path.replace(/^\/+/, '/')}`;

  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      Authorization: `Bearer ${token}`,
    },
    body: method === 'POST' ? JSON.stringify(body ?? {}) : undefined,
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Replit API ${res.status} ${res.statusText}: ${txt}`);
  }
  const data = await res.json().catch(() => ({}));
  return data;
}
