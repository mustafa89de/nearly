const Event = require('../models/Event');

class EventRepository {
  async createEvent(name, location, time, hostId, description) {
    try {
      let event = Event({name, description, location, time, hostId});
      await event.save();
    } catch (err) {
      console.error('DB Error:', err.message);
      throw err;
    }
  }
}

module.exports = new EventRepository();