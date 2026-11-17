const CACHE_NAME = 'lc150-pwa-v2';

// Base scope where the service worker is running
const BASE_PATH = self.registration.scope;

const PRECACHE_ASSETS = [
  BASE_PATH,
  `${BASE_PATH}manifest.webmanifest`,
  `${BASE_PATH}favicon.svg`,
  `${BASE_PATH}icons/icon-192x192.png`,
  `${BASE_PATH}icons/icon-512x512.png`,
  `${BASE_PATH}icons/apple-touch-icon.png`,
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_ASSETS))
      .catch((err) => console.warn('[SW] Pre-caching warning:', err))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => {
        return Promise.all(
          keys.map((key) => {
            if (key !== CACHE_NAME) {
              console.log('[SW] Purging old cache:', key);
              return caches.delete(key);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only handle GET requests and http/https schemes
  if (request.method !== 'GET' || !request.url.startsWith('http')) {
    return;
  }

  // Navigation requests (HTML pages)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.status === 200 && response.type === 'basic') {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(async () => {
          // Offline fallback: ONLY return cached response for THIS specific URL, NEVER fallback to home page!
          const cached = await caches.match(request);
          if (cached) return cached;
          return new Response(
            '<!DOCTYPE html><html><body style="background:#000;color:#fff;font-family:sans-serif;text-align:center;padding:50px;"><h2>Offline</h2><p>This page is not yet cached. Please reconnect to the internet and refresh.</p></body></html>',
            { headers: { 'Content-Type': 'text/html' } }
          );
        })
    );
    return;
  }

  // Static assets (CSS, JS, Fonts, Images, Icons)
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        // Return cached and update cache in background (stale-while-revalidate)
        fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => cache.put(request, networkResponse));
            }
          })
          .catch(() => {});
        return cachedResponse;
      }

      return fetch(request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        }
        return networkResponse;
      });
    })
  );
});
