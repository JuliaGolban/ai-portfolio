export function lsGet(key, fallback) {
  if (typeof window === 'undefined') return fallback;
  try {
    return localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
}
export function lsSet(key, val) {
  try {
    localStorage.setItem(key, String(val));
  } catch {}
}
