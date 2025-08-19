const VARIANTS = ['A', 'B'];
export function getVariant(key: string, anonId: string) {
  const hash = Array.from(key + anonId).reduce((a, c) => a + c.charCodeAt(0), 0);
  return VARIANTS[hash % VARIANTS.length];
}
