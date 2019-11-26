const Event = require('../models/Event');

class EventRepository {
  async createEvent(name, time, hostId, description, loc) {
    try {
      let event = Event({name, description, time, hostId, loc});
      await event.save();
    } catch (err) {
      console.error('DB Error:', err.message);
      throw err;
    }
  }

  async getEventsInArea(ne, se, sw, nw) {
    try {
      return await Event.find(
        {
          loc: {
            $geoWithin: {
              $geometry: {
                type: "Polygon",
                coordinates: [[
                  [ne.lng, ne.lat],
                  [se.lng, se.lat],
                  [sw.lng, sw.lat],
                  [nw.lng, nw.lat],
                  [ne.lng, ne.lat]
                ]]
              }
            }
          },
          time: {
            $gte: new Date()
          }
        }
      ).sort({"time": 1});
    } catch (err) {
      console.error('DB Error:', err.message);
    }
  }

  async getEventById(eid) {
    try {
      return await Event.findById(eid);
    } catch (err) {
      console.error('DB Error:', err.message);
      throw err;
    }
  }

  async getEventsByHost(hostId) {
    try {
      return await Event.find({'hostId': hostId});
    } catch (err) {
      console.error('DB Error:', err.message);
      throw err;
    }
  }

  async deleteEvent(eventId){
    try {
      let removal = await Event.deleteOne({
        _id: eventId
      });

      return removal.n > 0;

    } catch (err) {
      console.error('DB Error:', err.message);
      throw err;
    }
  }
}

module.exports = new EventRepository();