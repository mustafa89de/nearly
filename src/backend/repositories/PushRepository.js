const Push = require('../models/Push');

class PushRepository {
  async saveSubscription(userId, subscription) {
    try {
      const subscriptionJSON = JSON.parse(subscription);
      const push = Push({
        userId: userId,
        subscription: subscriptionJSON
      });
      await push.save();
    } catch (err) {
      console.error('DB Error:', err.message);
      throw err;
    }
  }

  async deleteSubscription(userId){
    try {
      const removal = Push.deleteOne({
        _id: userId
      });

      return removal.n > 0;

    } catch (err) {
      console.error('DB Error:', err.message);
      throw err;
    }
  }
}

module.exports = new PushRepository();