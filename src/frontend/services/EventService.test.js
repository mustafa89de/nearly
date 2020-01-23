import EventService from "../services/EventService";
import axios from "axios";
import {ENDPOINTS} from "../constants";

describe('EventService', () => {
  test('should call events api correctly', async () => {
    axios.post = jest.fn().mockResolvedValue(null);

    const testName = 'aName';
    const testDescription = 'aDescription';
    const testLatitude = 'aLocation';
    const testLongitude = 'aLocation';
    const testTime = 'aTime';

    await EventService.createEvent(testName, testDescription, testLatitude, testLongitude, testTime);

    expect(axios.post).toHaveBeenCalledWith(
        ENDPOINTS.EVENT,
        {
          "description": testDescription,
          "hostId": 'MOCKED_USER_ID',
          "latitude": testLatitude,
          "longitude": testLongitude,
          "name": testName,
          "time": testTime
        });
  });
});
