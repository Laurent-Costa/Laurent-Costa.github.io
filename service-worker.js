const CACHE_NAME = 'laurent-costa-carte-v3';
const ASSETS = [
  './index.html', './style.css', './script.js', './contact.vcf',
  './qr-contact-laurent-costa.png', './manifest.webmanifest',
  './icon-192.png', './icon-512.png', './apple-touch-icon.png'
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});
self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request).then(response => response || fetch(event.request)));
});
