const SWMESSAGES = {
  OFFLINE: 'offline'
};

let appIsOnline = true;

self.addEventListener('fetch', (event) => {
  return event.respondWith(
    fetch(event.request).catch(() => {
      if (appIsOnline){
        appIsOnline = false;
        sendOfflineMessages(event.clientId).catch((err) => {
          console.error(err.message);
        });
      }
    })
  )
});

let sendOfflineMessages = async function (cid) {
  try {
    if (!cid) return;
    const client = await self.clients.get(cid);
    if (!client) return;
    client.postMessage({
      msg: SWMESSAGES.OFFLINE
    })
  } catch (err) {
      console.error("Sending offline message from SW failed")
  }
}

