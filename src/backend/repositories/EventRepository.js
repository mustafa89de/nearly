const Event = require('../models/Event');

class EventRepository {
  async createEvent(name, latitude, longitude, time, hostId, description) {
    try {
      let event = Event({name, description, latitude, longitude, time, hostId});
      await event.save();
    } catch (err) {
      console.error('DB Error:', err.message);
      throw err;
    }
  }

  async getEventById(eid){
    try{
      return await Event.findById(eid);;
    }catch(err){
      console.error('DB Error:', err.message);
      throw err;
    }
  }
}

module.exports = new EventRepository();