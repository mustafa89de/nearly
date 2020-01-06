import axios from 'axios';
import {ENDPOINTS} from "../constants";
import AuthService from "./AuthService";

const publicVapidKey = PUBLIC_VAPID_KEY;

class PushService {
  async subscribeToPush() {
    try {
      const registration = await navigator.serviceWorker.register('/worker.js', {
        scope: '/'
      });
      console.log('SW registered');

      await registration.update();

      const permission = await Notification.requestPermission();
      if (permission && permission !== 'granted'){
        console.log('Notification Permission not granted');
        //TODO: handle permission not granted
        return;
      }

      await navigator.serviceWorker.ready;

      const appServerKey = this.urlB64ToUint8Array(publicVapidKey);

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: appServerKey
      });
      console.log('Subscribed to push');

      const stringifiedSubscription = JSON.stringify(subscription);

      await axios.post(ENDPOINTS.PUSH, {
        userId: AuthService.getUser().userId,
        subscription: stringifiedSubscription
      });
      console.log('subscription sent to BE');

    } catch (err) {
      console.error(err.message);
      throw err;
    }
  }

  async unsubscribePush(){
    try {
      const registration = await navigator.serviceWorker.register('../worker.js');

      await navigator.serviceWorker.ready;

      const subscription = await registration.pushManager.getSubscription();
      await subscription.unsubscribe();
      console.log('unsubscribed');

      await axios.delete(ENDPOINTS.PUSH, {
        params: {
          id: AuthService.getUser().userId
        }
      });

    } catch (err) {
      console.error(err.message);
      throw err;
    }
  }

  async hasSubscribed(){
    try {
      const registration = await navigator.serviceWorker.register('../worker.js');

      await navigator.serviceWorker.ready;

      const subscription = await registration.pushManager.getSubscription();
      if(subscription) {
        return true;
      }
      else {
        return false;
      }
    } catch(err) {
      console.error(err.message);
      throw err;
    }
  }

  urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
}

export default new PushService();