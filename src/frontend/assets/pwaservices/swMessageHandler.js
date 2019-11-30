export const handleMessage = function (event) {
  switch (event.data.msg) {
    case 'offline':
      document.getElementById("offlineoverlay").style.visibility = "visible";
      break;
    case "online":
      document.getElementById("offlineoverlay").style.visibility = "hidden";
      break;
    case 'reload':
      document.location.reload();
      break;
  }
};