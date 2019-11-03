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

  async getAllEvents({latitude, longitude}) {
    const eventsMock = [
      {
        latitude,
        longitude
      }
    ];
    return Promise.resolve(eventsMock);
  }
}

export default new EventService();