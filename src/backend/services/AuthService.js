const Event = require('../models/Event');

class AuthService {
  compareId(req, res, next) {
    const paramId = req.params.id;
    const userId = req.user.id;
    if (paramId === userId) {
      next();
    } else {
      return res.status(403).json('userId not equal to tokenId')
    }
  }

  async compareHostId(req, res, next) {
    try {
      const eventId = req.params.id;
      const event = await Event.findById(eventId);
      let hostId = null;
      if (event !== null) {
        hostId = event.hostId;
      }
      const userId = req.user.id;
      if(hostId === userId) {
        next();
      } else {
        return res.status(403).json('userId not equal to hostId')
      }
    } catch (err) {
      console.error('DB Error: ', err.message);
      throw err;
    }
  }
}

module.exports = new AuthService();