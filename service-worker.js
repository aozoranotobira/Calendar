var cacheName = 'calendar-v1';
var cacheFiles = [
  '/Calendar/js/main.js',
  '/Calendar/index.html'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(cacheFiles);
    }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== cacheName) {
          return caches.delete(key);
        }
      }));
    }));
});

self.addEventListener('fetch', function (e) {
  e.respondWith(
    caches.match(e.request).then((r) => {
      return r || fetch(e.request).then((response) => {
        return caches.open(cacheName).then((cache) => {
          cache.put(e.request, response.clone());
          return response;
        });
      });
    }));
});
