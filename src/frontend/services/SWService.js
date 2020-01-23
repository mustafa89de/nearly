class SWService {
  init() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function () {
        navigator.serviceWorker.register('/worker.js');
      })
    }
  }
}

export default new SWService();