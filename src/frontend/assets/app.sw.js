const SWMESSAGES = {
  OFFLINE: 'offline',
  ONLINE: 'online',
  RELOAD: 'reload'
};
const OFFLINECHECKERTIME = 5000;
let appIsOnline = true;

self.addEventListener('install', function (event) {
  self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  return event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (!appIsOnline) {
          appIsOnline = true;
          sendMessage(event.clientId, SWMESSAGES.ONLINE).catch((err) => {
            console.error(err.message);
          });
        }
        return response;
      })
      .catch(() => {
        if (appIsOnline) {
          appIsOnline = false;
          sendMessage(event.clientId, SWMESSAGES.OFFLINE).catch((err) => {
            console.error(err.message);
          });
        }
        checkOfflineState(event.request, event.clientId, OFFLINECHECKERTIME);
      })
  )
});

let sendMessage = async function (cid, message) {
  try {
    if (!cid) return;
    const client = await self.clients.get(cid);
    if (!client) return;
    client.postMessage({
      msg: message
    })
  } catch (err) {
    console.error(`Sending message: '${message}' from SW failed`);
  }
}

let checkOfflineState = function (request, clientId, timeout) {
  setTimeout(() => {
    fetch(request)
      .then(() => {
        sendMessage(clientId, SWMESSAGES.RELOAD);
      })
      .catch(() => {
        checkOfflineState(request, clientId, timeout);
      })
  }, timeout)
};

