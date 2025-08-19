const VARIANTS = ['A', 'B'];
let anonId = localStorage.getItem('anon_id') || crypto.randomUUID();
localStorage.setItem('anon_id', anonId);
export function getVariant(key: string) {
  const hash = Array.from(key + anonId).reduce((a, c) => a + c.charCodeAt(0), 0);
  return VARIANTS[hash % VARIANTS.length];
}
