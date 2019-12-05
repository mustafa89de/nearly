const User = require('../models/User');
const UserService = require('../services/UserService');

class UserRepository {
  async createUser(username, email, password, description) {
    try {
      const hashedPassword = await UserService.hashPassword(password);

      let user = User({
        username: username,
        email: email,
        password: hashedPassword,
        description: description || null
      });

      await user.save();
    } catch (err) {
      console.error('DB Error:', err.message);
      throw err;
    }
  }

  async getUserById(id) {
    try {
      return await User.findById(id);
    } catch (err) {
      console.error('DB Error:', err.message);
      throw err;
    }
  }

  async setHomePosition(userId, homePosition) {
    try {
      await User.findByIdAndUpdate(userId, {homePosition: homePosition})
    } catch (err) {
      console.error('DB Error:', err.message);
      throw err;
    }
  }

  async getHomePosition(userId) {
    try {
      const user = await User.findById(userId);
      if (!user.homePosition.type) {
        return null
      }
      return {
        longitude: user.homePosition.coordinates[0],
        latitude: user.homePosition.coordinates[1]
      }
    } catch (err) {
      console.error('DB Error:', err.message);
      throw err;
    }
  }

  async setRadius(userId, radius) {
    try {
      await User.findByIdAndUpdate(userId, {radius})
    } catch (err) {
      console.error('DB Error:', err.message);
      throw err;
    }
  }

  async getRadius(userId) {
    try {
      const user = await User.findById(userId);
      return user.radius;
    } catch (err) {
      console.error('DB Error:', err.message);
      throw err;
    }
  }

  async removeUser(email) {
    try {
      await User.deleteOne({email: email});
    } catch (err) {
      console.error('DB Error:', err.message);
      throw err;
    }
  }
}

module.exports = new UserRepository();