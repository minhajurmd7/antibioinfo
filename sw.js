// ===== SERVICE WORKER: NETWORK-FIRST STRATEGY (V5 - NEVER STUCK IN CACHE) =====
const CACHE_NAME = "abinfo-pwa-v5";

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
  "./manifest.json"
];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(OFFLINE_URLS).catch(() => {});
    })
  );
});

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

// Network-First: Always fetch latest version from GitHub Pages; use cache only when offline!
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        return caches.match(event.request).then((cachedResponse) => {
          return cachedResponse || caches.match("./index.html");
        });
      })
  );
});