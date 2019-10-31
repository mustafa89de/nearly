const JWT = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

class JWTService {

    signToken(user){
        return JWT.sign({
            iss: 'MeetApp',
            sub: user.id,
            exp: new Date().setDate(new Date().getDate() + 1) //current time +1 day
        }, JWT_SECRET);
    };
}

module.exports = new JWTService();