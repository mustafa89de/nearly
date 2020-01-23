
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

  event.waitUntil(
    self.clients.matchAll({type: 'window'}).then( windowClients => {
      for (let i = 0; i < windowClients.length; i++) {
        let client = windowClients[i];
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow(url);
      }
    })
  );
});




