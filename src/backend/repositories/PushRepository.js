const PushSubscriptions = require('../models/Push');
const Event = require('../models/Event');

class PushRepository {
  async saveSubscription(userId, subscription) {
    try {
      const subscriptionJSON = JSON.parse(subscription);
      const push = PushSubscriptions({
        userId: userId,
        subscription: subscriptionJSON
      });
      await push.save();
    } catch (err) {
      console.error('DB Error:', err.message);
      throw err;
    }
  }

  async deleteSubscription(userId) {
    try {
      const removal = await PushSubscriptions.deleteOne({
        userId
      });

      return removal.n > 0;

    } catch (err) {
      console.error('DB Error:', err.message);
      throw err;
    }
  }

  async getEventSubscriptions(eventId) {
    try {
      const allSubscriptions = await PushSubscriptions.find().populate('userId');

      let relevantSubscriptions = (await Promise.all(
        allSubscriptions.map(async (subscription) => {
          const userLocation = subscription._doc.userId._doc.homePosition.coordinates;
          const lng = userLocation[0];
          const lat = userLocation[1];
          const radius = 1; // 1km, replace with subscription._doc.userId._doc.homePosition.radius / 1000
          const pushEvent = await Event.find({
            _id: eventId,
            loc: {
              $geoWithin: {
                $centerSphere: [[lng, lat], radius / 6378.1]
              }
            }
          });
          if (pushEvent.length > 0) {
            return subscription._doc.subscription;
          }
        })
      )).filter(item => item !== undefined);

      return relevantSubscriptions;
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  }
}

module.exports = new PushRepository();