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

  event.notification.close();

  event.waitUntil(async function () {
      const allWindowClients = await clients.matchAll({
        includeUncontrolled: true,
        type: "window"
      });

      await clients.claim();

      allWindowClients[0].navigate('http://localhost:3000/event/' + event.notification.data);
      //allWindowClients[0].navigate('https://nearlyapp.herokuapp.com/event/' + event.notification.data);
    }()
  );
});

