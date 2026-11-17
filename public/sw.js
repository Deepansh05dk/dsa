const CACHE_NAME = 'lc150-pwa-v3';

// Base scope of the service worker (e.g. 'https://deepansh05dk.github.io/dsa/')
const BASE_PATH = self.registration.scope;

const PROBLEM_IDS = [
  1, 2, 3, 4, 5, 6, 9, 11, 12, 13, 14, 15, 17, 19, 20, 21, 22, 23, 25, 26, 27, 28,
  30, 33, 34, 35, 36, 39, 42, 45, 46, 48, 49, 50, 52, 53, 54, 55, 56, 57, 58, 61,
  63, 64, 66, 67, 68, 69, 70, 71, 72, 73, 74, 76, 77, 79, 80, 82, 86, 88, 92, 97,
  98, 100, 101, 102, 103, 104, 105, 106, 108, 112, 114, 117, 120, 121, 122, 123,
  124, 125, 127, 128, 129, 130, 133, 134, 135, 136, 137, 138, 139, 141, 146, 148,
  149, 150, 151, 153, 155, 162, 167, 169, 172, 173, 188, 189, 190, 191, 198, 199,
  200, 201, 202, 205, 207, 208, 209, 210, 211, 212, 215, 219, 221, 222, 224, 226,
  228, 230, 236, 238, 242, 274, 289, 290, 295, 300, 322, 373, 380, 383, 392, 399,
  427, 433, 452, 502, 530, 637, 909, 918
];

const PATTERN_SLUGS = [
  '1d-dp', 'array-string', 'backtracking', 'binary-search', 'binary-search-tree',
  'binary-tree-bfs', 'binary-tree-general', 'bit-manipulation', 'divide-and-conquer',
  'graph-bfs', 'graph-general', 'hashmap', 'heap', 'intervals', 'kadanes-algorithm',
  'linked-list', 'math', 'matrix', 'multidimensional-dp', 'sliding-window',
  'stack', 'trie', 'two-pointers'
];

const PRECACHE_SHELL = [
  BASE_PATH,
  `${BASE_PATH}manifest.webmanifest`,
  `${BASE_PATH}favicon.svg`,
  `${BASE_PATH}icons/icon-192x192.png`,
  `${BASE_PATH}icons/icon-512x512.png`,
  `${BASE_PATH}icons/apple-touch-icon.png`,
];

// Helper to match request in cache with/without trailing slashes
async function matchInCache(req) {
  const cache = await caches.open(CACHE_NAME);
  let match = await cache.match(req);
  if (match) return match;

  const url = typeof req === 'string' ? req : req.url;
  if (!url.endsWith('/')) {
    match = await cache.match(url + '/');
    if (match) return match;
  }
  if (url.endsWith('/')) {
    match = await cache.match(url.slice(0, -1));
    if (match) return match;
  }
  match = await cache.match(req, { ignoreSearch: true });
  if (match) return match;

  return null;
}

// Background batch-cache all 150 problems and 23 patterns
async function cacheAllProblemsAndPatterns() {
  const cache = await caches.open(CACHE_NAME);

  // Cache patterns
  for (const slug of PATTERN_SLUGS) {
    const url = `${BASE_PATH}patterns/${slug}/`;
    try {
      const match = await cache.match(url);
      if (!match) {
        const res = await fetch(url);
        if (res && res.status === 200) {
          await cache.put(url, res);
        }
      }
    } catch (e) {
      // Ignore background fetch failure, will retry next load
    }
  }

  // Cache all 150 problems in concurrent batches of 8
  const BATCH_SIZE = 8;
  for (let i = 0; i < PROBLEM_IDS.length; i += BATCH_SIZE) {
    const batch = PROBLEM_IDS.slice(i, i + BATCH_SIZE);
    await Promise.allSettled(
      batch.map(async (id) => {
        const url = `${BASE_PATH}problem/${id}/`;
        try {
          const match = await cache.match(url);
          if (!match) {
            const res = await fetch(url);
            if (res && res.status === 200) {
              await cache.put(url, res);
            }
          }
        } catch (e) {
          // Ignore individual fetch failure
        }
      })
    );
  }

  console.log('[SW] All 150 problems and 23 patterns are cached for full offline access!');

  // Notify clients that offline caching is complete
  const clients = await self.clients.matchAll();
  clients.forEach((client) => {
    client.postMessage({ type: 'ALL_PAGES_CACHED', count: PROBLEM_IDS.length });
  });
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_SHELL))
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
      .then(() => {
        // Automatically start caching all 150 problems in the background
        cacheAllProblemsAndPatterns();
      })
  );
});

self.addEventListener('message', (event) => {
  if (event.data === 'FORCE_CACHE_ALL') {
    cacheAllProblemsAndPatterns();
  }
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.method !== 'GET' || !request.url.startsWith('http')) {
    return;
  }

  // Navigation requests (HTML pages)
  if (request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const networkResponse = await fetch(request);
          if (networkResponse && networkResponse.status === 200) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        } catch (err) {
          // OFFLINE MODE: Serve cached page!
          const cached = await matchInCache(request);
          if (cached) {
            return cached;
          }
          // Fallback if not yet downloaded
          return new Response(
            `<!DOCTYPE html>
            <html lang="en" style="background:#000;color:#fff;font-family:system-ui,-apple-system,sans-serif;">
              <head><meta charset="UTF-8"><title>Offline | LeetCode 150</title><meta name="viewport" content="width=device-width,initial-scale=1"></head>
              <body style="min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px;text-align:center;">
                <div style="background:#0a0a0a;border:1px solid #262626;border-radius:16px;padding:32px;max-width:420px;width:100%;">
                  <h2 style="font-size:20px;margin:0 0 12px;font-weight:600;">Offline Study Mode</h2>
                  <p style="font-size:13px;color:#888;margin:0 0 20px;line-height:1.5;">This specific problem has not finished downloading to your offline storage yet. Reconnect to internet once to complete full offline download.</p>
                  <a href="${BASE_PATH}" style="display:inline-block;background:#fff;color:#000;padding:8px 16px;border-radius:8px;font-size:12px;font-weight:600;text-decoration:none;">Go to Dashboard</a>
                </div>
              </body>
            </html>`,
            { headers: { 'Content-Type': 'text/html' } }
          );
        }
      })()
    );
    return;
  }

  // Static assets (CSS, JS, Fonts, Images, Icons)
  event.respondWith(
    (async () => {
      const cached = await matchInCache(request);
      if (cached) {
        // Stale-while-revalidate
        fetch(request)
          .then(async (res) => {
            if (res && res.status === 200) {
              const cache = await caches.open(CACHE_NAME);
              cache.put(request, res);
            }
          })
          .catch(() => {});
        return cached;
      }

      try {
        const networkResponse = await fetch(request);
        if (networkResponse && networkResponse.status === 200) {
          const cache = await caches.open(CACHE_NAME);
          cache.put(request, networkResponse.clone());
        }
        return networkResponse;
      } catch (err) {
        return cached;
      }
    })()
  );
});
