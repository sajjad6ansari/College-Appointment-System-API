// Simple one-time backend warmup utility
// Pings the backend /health endpoint exactly once per browser session.

export async function warmBackendOnce() {
  try {
    if (sessionStorage.getItem('backend-warmed')) return;
    sessionStorage.setItem('backend-warmed', '1');
    const baseUrl = (import.meta.env.VITE_API_ROOT_URL || import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
    if (!baseUrl) return;
    const url = baseUrl + '/health';
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5000);
    await fetch(url, { method: 'GET', mode: 'cors', cache: 'no-store', signal: controller.signal });
    clearTimeout(timer);
  } catch {
    // Silently ignore; warmup is best-effort
  }
}
