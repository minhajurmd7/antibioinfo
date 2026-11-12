// ===== SERVICE WORKER: CACHE-FIRST / OFFLINE STRATEGY (V4) =====
const CACHE_NAME = "abinfo-pwa-v4";

const OFFLINE_URLS = [
  "./",
  "./index.html",
  "./drugs.html",
  "./classes.html",
  "./dispense.html",
  "./calculator.html",
  "./interactions.html",
  "./flowchart.html",
  "./resistance.html",
  "./quiz.html",
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

// Install: Cache all core assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(OFFLINE_URLS);
    }).then(() => self.skipWaiting())
  );
});

// Activate: Clean up old cache versions (v3 and earlier)
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
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        // Fallback for offline navigation
        if (event.request.mode === "navigate") {
          return caches.match("./index.html");
        }
      });
    })
  );
});