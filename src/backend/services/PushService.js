const webPush = require('web-push');

//// generate in terminal with ./node_modules/.bin/web-push generate-vapid-keys
const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

class PushService {
  init(){
    webPush.setVapidDetails(
      'mailto:test@test.com',
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
}

module.exports = new PushService();