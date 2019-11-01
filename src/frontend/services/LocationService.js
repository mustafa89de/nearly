class LocationService {
  getCurrentLocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve(position.coords);
      }, err => {
        reject(err)
      });

    })
  }
}


export default new LocationService()