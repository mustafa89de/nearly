import {mount} from '@vue/test-utils';
import RegistrationPage from './RegistrationPage.vue';
import CreateEventPage from "./CreateEventPage";
import EventService from "../services/EventService";

describe('CreateEventPage', () => {
  test('should create event', async () => {
    EventService.createEvent = jest.fn().mockResolvedValue();

    const testName = 'aName';
    const testDescription = 'aDescription';
    const testLatitude = 11.11;
    const testLongitude = 22.22;
    const testTime = 'aTime';

    const wrapper = mount(CreateEventPage);
    wrapper.setData({
      name: testName,
      description: testDescription,
      latitude: testLatitude,
      longitude: testLongitude,
      time: testTime
    });

    await wrapper.vm.handleEventCreation({preventDefault: jest.fn()});

    expect(EventService.createEvent).toHaveBeenCalledWith(testName, testDescription, testLatitude, testLongitude, testTime);
  });
});
