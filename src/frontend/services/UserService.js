import axios from 'axios';
import {ENDPOINTS} from "../constants";
import AuthService from "./AuthService";

class UserService {
  async register(username, email, password) {
    try {
      await axios.post(ENDPOINTS.USER, {
        username,
        email,
        password
      })
    } catch (err) {
      err.status = err.response.status;
      console.error(err.message);
      throw err;
    }
  }

  async getUserByID(uid) {
    try {
      const res = await axios.get(ENDPOINTS.USER + '/' + uid);
      return res.data;
    } catch (err) {
      err.status = err.response.status;
      console.error(err.message);
      throw err;
    }
  }

  async getUserById(uid) {
    try {
      const res = await axios.get(ENDPOINTS.USER + "/" + uid);
      return res.data;
    } catch (err) {
      err.status = err.response.status;
      console.error(err.message);
      throw err;
    }
  }

  async setHomePosition({lon, lat}) {
    const myUserId = AuthService.getUser().userId;
    const position = {
      longitude: lon,
      latitude: lat
    };
    try {
      const res = await axios.put(ENDPOINTS.USER + "/" + myUserId + '/homePosition', position);
      return res.data;
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  }

  async getHomePosition() {
    const myUserId = AuthService.getUser().userId;
    try {
      const res = await axios.get(ENDPOINTS.USER + "/" + myUserId + '/homePosition');
      return res.data;
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  }

  async setRadius(radius) {
    const myUserId = AuthService.getUser().userId;
    try {
      const res = await axios.put(ENDPOINTS.USER + "/" + myUserId + '/radius', { radius });
      return res.data;
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  }

  async getRadius() {
    const myUserId = AuthService.getUser().userId;
    try {
      const res = await axios.get(ENDPOINTS.USER + "/" + myUserId + '/radius');
      return res.data;
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  }
}

export default new UserService();