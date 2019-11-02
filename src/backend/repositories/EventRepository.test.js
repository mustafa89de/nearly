const Event = require('../models/Event');
const EventRepository = require('./EventRepository');

describe('Event Repository', () => {
  it('createEvent() should save event', async () => {
    Event.prototype.save = jest.fn().mockResolvedValue();

    await EventRepository.createEvent('anName', 'aLocation', +new Date(), 'aHostId', 'anOptionalDescription');

    expect(Event.prototype.save).toHaveBeenCalled();
  })
});