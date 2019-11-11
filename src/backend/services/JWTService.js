const JWT = require('jsonwebtoken');
const passport = require("passport");
const JWT_SECRET = process.env.JWT_SECRET;

class JWTService {

  //jwt-authentication for token authentication/validation
  //if token invalid/not authentic, automatically responds with 401 with body{Unauthorized}
  requireJWT() {
    return passport.authenticate('jwt', {session: false});
  }

  //local authentication for email/password
  //if any are incorrect, automatically responds with 401 with body{Unauthorized}
  requireCredentials() {
    return passport.authenticate('local', {session: false});
  }

  signToken(user) {
    return JWT.sign({
      iss: 'MeetApp',
      sub: user.id,
      username: user.username,
      exp: new Date().setDate(new Date().getDate() + 1) //current time +1 day
    }, JWT_SECRET);
  };

  getUserId(req){
    const token = req.get('Authorization');
    const userId = JWT.decode(token, {json: true}).sub;
    if(userId) return userId;
    else return null;
  }

}

module.exports = new JWTService();