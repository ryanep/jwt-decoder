const cacheVersion = 1;
const cacheName = `offline-cache-${cacheVersion}`;
const cacheFiles = ['/', '/app.css', '/app.js'];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(cacheFiles);
    }),
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    }),
  );
});
