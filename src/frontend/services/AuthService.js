import axios from 'axios';
import {ENDPOINTS} from "../constants";
import JWTService from "./JWTService";

class AuthService {

  async login(email, password) {
    try {
      const res = await axios.post(ENDPOINTS.LOGIN, {
        email,
        password
      });
      JWTService.storeJWT(res.data.token);
    } catch (err) {
      err.status = err.response.status;
      console.error(err.message);
      throw err;
    }
  }

  isAuthenticated() {
    return !!JWTService.getJWT();
  }

  getUser() {
    const {sub, username} = JWTService.getPayload();
    return {
      userId: sub,
      username
    };
  }

  logout(router) {
    JWTService.removeJWT();
    router.go();
  }
}

export default new AuthService();