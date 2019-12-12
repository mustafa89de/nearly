const webPush = require('web-push');
const PushRepository = require('../repositories/PushRepository');

//// generate in terminal with ./node_modules/.bin/web-push generate-vapid-keys
const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

class PushService {
  init(){
    webPush.setVapidDetails(
      'mailto:nearlyapplication@gmail.com',
      publicVapidKey,
      privateVapidKey
    )
  }

  async sendPush(subscription, payload){
    try {
      await webPush.sendNotification(subscription, payload)
    }catch (err) {
      console.error('Failed to send push notificaiton: ' + err.message)
    }
  }

  async notifyUsers(name, eventId){
    try {
      const payload = JSON.stringify({title: 'New Nearly Event', body: name, data: eventId});
      const subscriptions = await PushRepository.getSubscriptionsOfInterestedUsers(eventId);

      subscriptions.forEach(async subscription => {
        await webPush.sendNotification(subscription, payload);
      });
    }catch (err) {
      console.error('Failed to send push notificaiton: ' + err.message)
    }
  }
}

module.exports = new PushService();