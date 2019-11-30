const SWMESSAGES = {
  OFFLINE: 'offline',
  ONLINE: 'online',
  RELOAD: 'reload'
};
const OFFLINECHECKERTIME = 5000;
let appIsOnline = true;

self.addEventListener('fetch', (event) => {
  return event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (!appIsOnline) {
          appIsOnline = true;
          sendOnlineMessages(event.clientId).catch((err) => {
            console.error(err.message);
          });
        };
        return response;
      })
      .catch(() => {
        if (appIsOnline) {
          appIsOnline = false;
          sendOfflineMessages(event.clientId).catch((err) => {
            console.error(err.message);
          });
          checkOfflineState(event.request, event.clientId, OFFLINECHECKERTIME);
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
};

let sendOnlineMessages = async function (cid) {
  try {
    if (!cid) return;
    const client = await self.clients.get(cid);
    if (!client) return;
    client.postMessage({
      msg: SWMESSAGES.ONLINE
    })
  } catch (err) {
    console.error("Sending Online message from SW failed")
  }
};

let sendReloadMessage = async function (cid) {
  try {
    if (!cid) return;
    const client = await self.clients.get(cid);
    if (!client) return;
    client.postMessage({
      msg: SWMESSAGES.RELOAD
    })
  } catch (err) {
    console.error("Sending Reload message from SW failed")
  }
};

let checkOfflineState = function (request, clientId, timeout) {
  setTimeout(() => {
    console.log("try to fetch again");
    fetch(request)
      .then(() => {
        sendReloadMessage(clientId);
      })
      .catch(() => {
        checkOfflineState(request, clientId, timeout);
      })
  }, timeout)
};

