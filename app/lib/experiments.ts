import { getAnonId } from './analytics';
const VARIANTS = ['A', 'B'];
export async function getVariant(key: string) {
  const id = await getAnonId();
  // Simple hash for assignment
  const hash = Array.from(key + id).reduce((a, c) => a + c.charCodeAt(0), 0);
  return VARIANTS[hash % VARIANTS.length];
}
