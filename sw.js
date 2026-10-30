// ===== SERVICE WORKER: CACHE-FIRST / OFFLINE STRATEGY =====
const CACHE_NAME = "abinfo-pwa-v3";

const OFFLINE_URLS = [
  "./",
  "./index.html",
  "./classes.html",
  "./drug.html",
  "./glossary.html",
  "./references.html",
  "./about.html",
  "./style.css",
  "./data.js",
  "./classes.js",
  "./drug.js",
  "./navbar.js",
  "./script.js",
  "./i18n.js",
  "./glossary.js",
  "./manifest.json",
];

// Install: Cache all core assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(OFFLINE_URLS);
    }).then(() => self.skipWaiting())
  );
});

// Activate: Clean up old cache versions
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Serve from cache, fall back to network
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;

      return fetch(event.request).then((networkResponse) => {
        // Cache external requests if successful
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        // Fallback for HTML navigations when offline
        const accept = event.request.headers.get("accept");
        if (accept && accept.includes("text/html")) {
          return caches.match("index.html");
        }
      });
    })
  );
});