// ===== SERVICE WORKER FOR AB|INFO (OFFLINE PWA CACHE) =====
const CACHE_NAME = "abinfo-pwa-v3";

const ASSETS_TO_CACHE = [
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
  "./favicon.svg"
];

// Install Event: Cache Core Assets
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate Event: Cleanup Old Cache Versions
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch Event: Cache-First with Network Fallback
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request).then(networkResponse => {
        if (
          !networkResponse ||
          networkResponse.status !== 200 ||
          networkResponse.type !== "basic"
        ) {
          return networkResponse;
        }

        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseToCache);
        });

        return networkResponse;
      }).catch(() => {
        // Offline fallback to homepage if route is not cached
        return caches.match("./index.html");
      });
    })
  );
});