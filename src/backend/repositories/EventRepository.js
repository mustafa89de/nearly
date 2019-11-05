const Event = require('../models/Event');

class EventRepository {
  async createEvent(name, time, hostId, description, location) {
    try {
      let event = Event({name, description, time, hostId, location});
      await event.save();
    } catch (err) {
      console.error('DB Error:', err.message);
      throw err;
    }
  }

  async getAllEvents(){
    try {
      let [events] = await Promise.all([Event.find({})]);
      return events;
    } catch (err) {
      console.error('DB Error:', err.message);
      throw err;
    }
  }


}

module.exports = new EventRepository();