const User = require('../models/User');
const UserRepository = require('./UserRepository');
const UserService = require('../services/UserService');

describe('User Repository', () => {
  it('createUser() should save user with hashed password', async () => {
    User.prototype.save = jest.fn().mockResolvedValue();
    UserService.hashPassword = jest.fn().mockResolvedValue();

    await UserRepository.createUser('anUsername', 'anEmail', 'aPassword');

    expect(UserService.hashPassword).toHaveBeenCalled();
    expect(User.prototype.save).toHaveBeenCalled();
  })
});