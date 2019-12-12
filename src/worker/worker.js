self.addEventListener('push', e => {
  const data = e.data.json();
  console.log(data);
  self.registration.showNotification(data.title, {
    body: data.body,
    data: data.data,
    requireInteraction: true,
    vibrate: [300, 100, 300]
  })

});

self.addEventListener('notificationclick', e => {
  //TODO: redirect to event
  console.log('notification clicked');
  clients.openWindow('localhost:3000/event/' + e.notification.data);
  console.log('opened window')
});

