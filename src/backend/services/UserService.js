const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const {JWT_SECRET} = require('../configuration/config');

class UserService {
    hashPassword(plainPassword) {
        return bcrypt.hash(plainPassword, 10);
    }

    compareHashed(inputPassword, dBPassword) {
        try {
            return bcrypt.compare(inputPassword, dBPassword);

        } catch (err) {
            throw new Error(err);
        }
    }

    signToken = user => {
        return JWT.sign({
            iss: 'MeetApp',
            sub: user.id,
            exp: new Date().setDate(new Date().getDate() + 1) //current time +1 day
        }, JWT_SECRET);
    };
}

module.exports = new UserService();