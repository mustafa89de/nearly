import axios from 'axios';
import {ENDPOINTS} from "../constants";
import AuthService from "./AuthService";

class EventService {
  async createEvent(name, description, latitude, longitude, time) {
    try {
      const userId = AuthService.getUser().userId;

      await axios.post(ENDPOINTS.EVENT, {
        name,
        description: description || null,
        latitude,
        longitude,
        time,
        hostId: userId
      })
    } catch (err) {
      err.status = err.response.status;
      console.error(err.message);
      throw err;
    }
  }

  async getAllEvents([p1, p2]) {
    // an mocked event in the center of the bounds
    const eventsMock = [
      {
        id: 'id0',
        lon: 13.41702456,
        lat: 52.50200857,
        title: 'Event 1',
        description: 'This is a description 1.',
        time: new Date().toString()
      },
      {
        id: 'id1',
        lon: 13.41556543,
        lat: 52.50321186,
        title: 'Event 2',
        description: 'This is a description 2.',
        time: new Date().toString()
      },
      {
        id: 'id2',
        lon: 13.4170031,
        lat: 52.50325104,
        title: 'Event 3',
        description: 'This is a description 3.',
        time: new Date().toString()
      }
    ];
    return Promise.resolve(eventsMock);
  }

  async getEventById(eid) {
    try {
      const res = await axios.get(ENDPOINTS.EVENT + '/' + eid);
      return res.data;
    } catch (err) {
      err.status = err.response.status;
      console.error(err.message);
      throw err;
    }
  }
}

export default new EventService();