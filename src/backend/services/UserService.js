const bcrypt = require('bcrypt');

class UserService {
    hashPassword(plainPassword) {
        return bcrypt.hash(plainPassword, 10);
    }

    compareHashed(first, second) {
        // TODO: implement later
    }
}

module.exports = new UserService();