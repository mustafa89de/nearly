
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
self.addEventListener('push', event => {
  const data = event.data.json();
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      data: data.data,
      requireInteraction: true,
      vibrate: [300, 100, 300],
      icon: 'static/icons/120.png'
    })
  );
});

self.addEventListener('notificationclick', event => {

  const url = self.registration.scope + 'event/' + event.notification.data;

  event.notification.close();

  event.waitUntil(async function () {
      const allWindowClients = await clients.matchAll({
        includeUncontrolled: true,
        type: "window"
      });

      await clients.claim();

      allWindowClients[0].navigate(url);
    }()
  );
});

