import EventService from "../services/EventService";
import axios from "axios";
import {ENDPOINTS} from "../constants";

describe('EventService', () => {
  test('should call events api correctly', async () => {
    axios.post = jest.fn().mockResolvedValue();

    const testName = 'aName';
    const testDescription = 'aDescription';
    const testLocation = 'aLocation';
    const testTime = 'aTime';

    await EventService.createEvent(testName, testDescription, testLocation, testTime);

    expect(axios.post).toHaveBeenCalledWith(
        ENDPOINTS.EVENT,
        {
          "description": testDescription,
          "hostId": 'MOCKED_USER_ID',
          "location": testLocation,
          "name": testName,
          "time": testTime
        });
  });
});
