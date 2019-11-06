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
      return  await Event.find(
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
}

module.exports = new EventRepository();