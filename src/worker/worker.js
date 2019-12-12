self.addEventListener('push', event => {
  const data = event.data.json();
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      data: data.data,
      requireInteraction: true,
      vibrate: [300, 100, 300]
    })
  );
});

self.addEventListener('notificationclick', event => {
  console.log('notification clicked');

  event.notification.close();
  clients.openWindow('localhost:3000/event/' + event.notification.data);

  console.log('opened window')
});

