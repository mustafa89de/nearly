
// service worker configuration using workbox api 'https://developers.google.com/web/tools/workbox/modules/workbox-precaching'
workbox.precaching.precacheAndRoute(self.__precacheManifest || []);
workbox.precaching.cleanupOutdatedCaches();

// lets the service worker immediately take control over pages after install
workbox.core.skipWaiting();
workbox.core.clientsClaim();


// adds navigation routs for SPA
workbox.routing.registerNavigationRoute(
  workbox.precaching.getCacheKeyForURL('/index.html')
);

// TODO: @Jonas push service worker logic to be added here

