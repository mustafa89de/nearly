export const handleMessage = function (event) {
  if (event.data.msg === 'offline') {
    document.getElementById("offlineoverlay").style.visibility = "visible";
  } else if (event.data.msg === 'online') {
    document.getElementById("offlineoverlay").style.visibility = "hidden";
  } else if (event.data.msg === 'reload') {
    console.log("Try to reload");
    document.location.reload();
  }
}