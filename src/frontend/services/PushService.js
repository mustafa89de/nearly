import axios from 'axios';
import {ENDPOINTS} from "../constants";
import AuthService from "./AuthService";
import Fingerprint2 from "fingerprintjs2";

const publicVapidKey = PUBLIC_VAPID_KEY;

class PushService {
  async subscribeToPush() {
    try {
      const subscription = await this.getNewSubscriptionSW();

      if (!subscription) return false;

      const deviceFingerprint = await this.getDeviceFingerprint();

      const subscriptionDB = await this.getSubscriptionDB();

      if (subscriptionDB !== null) {
        await this.updateSubscriptionDB(subscription)
      } else {
        await axios.post(ENDPOINTS.PUSH, {
          userId: AuthService.getUser().userId,
          subscription: JSON.stringify(subscription),
          deviceFingerprint: deviceFingerprint
        });
      }
      console.log('subscription sent to BE');
      return true;

    } catch (err) {
      console.error(err.message);
      throw err;
    }
  }

  async unsubscribePush() {
    try {
      if (Notification.permission !== "granted") return;

      const registration = await navigator.serviceWorker.register('../worker.js');

      await navigator.serviceWorker.ready;

      const subscription = await registration.pushManager.getSubscription();
      await subscription.unsubscribe();
      console.log('unsubscribed');

      const deviceFingerprint = await this.getDeviceFingerprint();

      await axios.delete(ENDPOINTS.PUSH, {
        params: {
          id: AuthService.getUser().userId,
          deviceFingerprint: deviceFingerprint
        }
      });

    } catch (err) {
      console.error(err.message);
      throw err;
    }
  }

  async hasSubscribed() {
    try {
      if (Notification.permission !== 'granted') {
        return;
      }

      const registration = await navigator.serviceWorker.register('../worker.js');

      await navigator.serviceWorker.ready;

      const subscriptionSW = await registration.pushManager.getSubscription();

      const subscriptionDB = await this.getSubscriptionDB();

      const deviceFingerprint = await this.getDeviceFingerprint();

      if (subscriptionSW && subscriptionDB) {
        if (subscriptionSW.endpoint !== subscriptionDB.endpoint) {
          await this.updateSubscriptionDB(subscriptionSW);
          return true;
        } else {
          return true;
        }
      } else if (!subscriptionSW && subscriptionDB) {
        const subscriptionSW = await this.getNewSubscriptionSW();
        await this.updateSubscriptionDB(subscriptionSW);
        return true;
      } else {
        return false;
      }
    } catch (err) {
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

  async getDeviceFingerprint() {
    try {
      let components = await Fingerprint2.getPromise();
      let values = components.map(component => component.value);
      return Fingerprint2.x64hash128(values.join(''), 31);
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  }

  async getSubscriptionDB() {
    try {
      const response = await axios.get(ENDPOINTS.PUSH, {
        params: {
          userId: AuthService.getUser().userId,
          deviceFingerprint: await this.getDeviceFingerprint()
        }
      });

      return response.data.subscription;
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  }

  async updateSubscriptionDB(subscription) {
    try {
      const stringifiedSubscription = JSON.stringify(subscription);
      return await axios.put(ENDPOINTS.PUSH, {
        userId: AuthService.getUser().userId,
        subscription: stringifiedSubscription,
        deviceFingerprint: await this.getDeviceFingerprint()
      });
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  }

  async getNewSubscriptionSW() {
    try {
      const permission = await Notification.requestPermission();
      if (permission && permission !== 'granted') {
        console.log('Notification Permission not granted');
        //TODO: handle permission not granted
        return;
      }

      const registration = await navigator.serviceWorker.register('/worker.js', {
        scope: '/'
      });

      console.log('SW registered');

      await registration.update();

      await navigator.serviceWorker.ready;

      const appServerKey = this.urlB64ToUint8Array(publicVapidKey);

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: appServerKey
      });
      console.log('Subscribed to push');

      return subscription;
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  }
}

export default new PushService();