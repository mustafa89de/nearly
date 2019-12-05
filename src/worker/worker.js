const title = 'Nearly';

self.addEventListener('push', e => {
  const data = e.data.json();
  self.registration.showNotification(title, {
    body: data.body,
    data: data.eventId,
    requireInteraction: true,
    vibrate: [300, 100, 300]
  })
});

self.addEventListener('notificationclick', e => {
  //TODO: redirect to event
  console.log('notification clicked')
});