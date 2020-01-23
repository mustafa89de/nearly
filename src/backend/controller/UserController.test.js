const request = require('supertest');
const app = require('../app');
const UserRepository = require("../repositories/UserRepository");


describe('User Controller', () => {
  describe('POST /user', () => {
    it('should create User and return 201 with empty body on success', () => {
      const testUsername = 'John';
      const testEmail = 'john@gmail.com';
      const testPassword = '123456';
      const testDescr = 'blahblahblah';

      UserRepository.createUser = jest.fn().mockResolvedValue();

      return request(app)
        .post('/api/user')
        .send({
          username: testUsername,
          email: testEmail,
          password: testPassword,
          description: testDescr
        })
        .expect(201)
        .then(response => {
          expect(response.body).toBe('');
          expect(UserRepository.createUser).toHaveBeenCalledWith(testUsername, testEmail, testPassword, testDescr)
        })
    });
  });

});
