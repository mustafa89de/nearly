
self.addEventListener('fetch', (event) => {
  return event.respondWith(
    fetch(event.request).catch(()=>{
      console.log("APP is Offline");
    })
  )
})