const bcrypt = require('bcrypt');

class UserService {
    async hashPassword(plainPassword) {
        return await bcrypt.hash(plainPassword, 10);
    }


    async compareHashed(inputPassword, dBPassword) {
        return await bcrypt.compare(inputPassword, dBPassword);
    }
}

module.exports = new UserService();