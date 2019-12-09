class SWService {
  init(){
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function(){
        navigator.serviceWorker.register('/sw.js');
      })
    }
  }
}

export default new SWService();