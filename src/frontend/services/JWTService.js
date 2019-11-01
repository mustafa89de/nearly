const JWT = require('jsonwebtoken');

class JWTService {
  storeJWT(token) {
    localStorage.setItem('jwt', token);
  }

  getJWT() {
    return localStorage.getItem('jwt');
  }

  getPayload() {
    const token = this.getJWT();
    return JWT.decode(token);
  }

  removeJWT() {
    return localStorage.removeItem('jwt');
  }
}


export default new JWTService()