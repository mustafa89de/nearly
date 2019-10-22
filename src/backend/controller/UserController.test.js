const request = require('supertest');
const app = require('../app');
const UserRepository = require("../repositories/UserRepository");


describe('User Controller',  () => {
    describe('POST /user/register',  () => {
        it('should create User and return 201 on success',  () => {
            const testName = 'John';
            const testEmail = 'john@gmail.com';
            const testPassword = '123456';
            const testDescr = 'blahblahblah';

            UserRepository.createUser = jest.fn().mockResolvedValue();

            request(app)
                .post('/api/user/register')
                .send({
                    name: testName,
                    email: testEmail,
                    password: testPassword,
                    description: testDescr
                })
                .expect(201)
                .end(function (err, res) {
                    if (err) throw err;
                    console.log(res.body);
                    done();
                });
        });
    });

});
