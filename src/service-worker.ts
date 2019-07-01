const cacheVersion = 1;
const cacheName = `offline-cache-${cacheVersion}`;
const cacheFiles = ['/', '/app.css', '/app.js'];

const handleServiceWorkerInstall = (event: FetchEvent) => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(cacheFiles);
    }),
  );
};

const handleServiceWorkerFetch = (event: FetchEvent) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    }),
  );
};

const init = (service: ServiceWorkerGlobalScope) => {
  service.addEventListener('install', handleServiceWorkerInstall);
  service.addEventListener('fetch', handleServiceWorkerFetch);
};

init(self as any);
