
// service worker configuration using workbox api 'https://developers.google.com/web/tools/workbox/modules/workbox-precaching'
workbox.precaching.precacheAndRoute(self.__precacheManifest || []);
workbox.precaching.cleanupOutdatedCaches();

// adds navigation routs for SPA
workbox.routing.registerNavigationRoute(
  workbox.precaching.getCacheKeyForURL('/index.html')
);