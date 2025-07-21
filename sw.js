const CACHE_NAME = 'greeting-page-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/scene-manager.js',
  '/scene1/index.html',
  '/scene1/styles.css',
  '/scene1/script.js',
  '/scene1/images/purple.jpg',
  '/scene2/index.html',
  '/scene2/styles.css',
  '/scene2/script.js',
  '/scene2/config.json',
  '/scene3/index.html',
  '/scene3/styles.css',
  '/scene3/script.js',
  '/scene3/config.json',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME).map(name => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});