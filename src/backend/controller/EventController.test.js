const request = require('supertest');
const app = require('../app');
const EventRepository = require("../repositories/EventRepository");
const JWTService = require("../services/JWTService");
const passport = require("passport");


describe('Event Controller', () => {
  describe('POST /event', () => {
    it('should create event and return 201 and created event on success', () => {
      const testName = 'aName';
      const testLocation = 'aLocation';
      const testTime = +new Date();
      const testHost = 'aHostId';
      const testDescription = 'anOptionalDescription';

      const mockEvent = 'aMockedEvent';

      EventRepository.createEvent = jest.fn().mockResolvedValue(mockEvent);
      passport.authenticate = jest.fn().mockImplementation(() => {
        console.log('ZZZZ');
        return (req, res, next) => next()
      });

      return request(app)
          .post('/api/event')
          .send({
            name: testName,
            description: testDescription,
            location: testLocation,
            time: testTime,
            hostId: testHost
          })
          .expect(201)
          .then(response => {
            expect(EventRepository.createEvent).toHaveBeenCalledWith(testName, testLocation, testTime, testHost, testDescription);
            expect(response.body).toEqual(mockEvent);
          })
    });
  });
});
