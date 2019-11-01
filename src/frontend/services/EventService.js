import axios from 'axios';
import {ENDPOINTS} from "../constants";

class EventService {
  async createEvent(name, description, location, time) {
    try {
      const userId = 'MOCKED_USER_ID'; // TODO: Read from jwt
      await axios.post(ENDPOINTS.EVENT, {
        name,
        description: description || null,
        location,
        time,
        hostId: userId
      })
    } catch (err) {
      err.status = err.response.status;
      console.error(err.message);
      throw err;
    }
  }
}

export default new EventService();