const bcrypt = require('bcrypt');

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
}

module.exports = new UserService();