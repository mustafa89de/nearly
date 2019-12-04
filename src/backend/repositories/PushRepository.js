const Push = require('../models/Push');

class PushRepository {
  async saveSubscription(userId, subscription) {
    try {
      const push = Push({userId, subscription});
      await push.save();
    } catch (err) {
      console.error('DB Error:', err.message);
      throw err;
    }
  }
}