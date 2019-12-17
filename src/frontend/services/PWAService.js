import {ONE_DAY} from "../constants";

const PWA_STORAGE_KEY = 'pwa-last-time-closed';
const EXPIRATION_THRESHOLD = 7 * ONE_DAY;

class PWAService {
  shouldShowNotification() {
    const lastTimeClosed = this.getLastTimeClosed();

    let timeExpired;
    if (lastTimeClosed) {
      timeExpired = +new Date() > lastTimeClosed + EXPIRATION_THRESHOLD;
    } else {
      timeExpired = true;
    }

    return timeExpired && (location.hostname === 'localhost' || this.isIos() && !this.isInStandaloneMode())
  }

  setLastTimeClosed() {
    localStorage.setItem(PWA_STORAGE_KEY, +new Date())
  }

  getLastTimeClosed() {
    const string = localStorage.getItem(PWA_STORAGE_KEY);
    return string ? parseInt(string) : null
  }

  isIos() {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent);
  }

  isInStandaloneMode() {
    return 'standalone' in window.navigator && window.navigator.standalone
  }
}

export default new PWAService()