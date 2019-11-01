import LocationService from "./LocationService";

describe('LocationService', () => {
  test('should call Location api', async () => {
    const testLat = 'aLat';
    const testLong = 'aLong';

    const getCurrentPositionMock = jest.fn().mockImplementation((onSuccess) => onSuccess({
      coords: {
        latitude: testLat,
        longitude: testLong
      }
    }));

    global.navigator.geolocation = {
      getCurrentPosition: getCurrentPositionMock,
    };

    const location = await LocationService.getCurrentLocation();

    expect(global.navigator.geolocation.getCurrentPosition).toHaveBeenCalled();
    expect(location.latitude).toBe(testLat);
    expect(location.longitude).toBe(testLong);
  });
});
