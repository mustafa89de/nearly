const JWT = require('jsonwebtoken');
const passport = require("passport");
const JWT_SECRET = process.env.JWT_SECRET;

class JWTService {

  //jwt-authentication for token authentication/validation
  //if token invalid/not authentic, automatically responds with 401 with body{Unauthorized}
  requireJWT() {
    console.log('YYYYYYY');
    return passport.authenticate('jwt', {session: false});
  }

  //local authentication for email/password
  //if any are incorrect, automatically responds with 401 with body{Unauthorized}
  requireCredentials = () => passport.authenticate('local', {session: false});

  signToken = user => {
    return JWT.sign({
      iss: 'MeetApp',
      sub: user.id,
      exp: new Date().setDate(new Date().getDate() + 1) //current time +1 day
    }, JWT_SECRET);
  };
}

module.exports = new JWTService();