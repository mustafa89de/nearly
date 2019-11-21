import {FALLBACK_HOME_POSITION, INITIAL_MAP_RADIUS} from "../constants";
import UserService from "./UserService";
import AuthService from "./AuthService";

const mapboxgl = require("mapbox-gl");

class LocationService {
  getCurrentLocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve(position.coords);
      }, err => {
        reject(err)
      }, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      });
    })
  }

  getHomePosition() {
    return new Promise(async (resolve, reject) => {
      const homePosition = await UserService.getHomePosition(AuthService.getUser().userId);
      if (homePosition) {
        resolve(homePosition);
      } else {
        try {
          const {latitude, longitude} = await this.getCurrentLocation();
          resolve({
            lon: longitude,
            lat: latitude
          });
        } catch (e) { // f.e. if permission denied
          console.error(e);
          resolve(FALLBACK_HOME_POSITION);
        }
      }
    });
  }

  getDistance(p1, p2) {
    function degreesToRadians(degrees) {
      return degrees * Math.PI / 180;
    }

    const earthRadiusKm = 6371;

    const dLat = degreesToRadians(p2.lat - p1.lat);
    const dLon = degreesToRadians(p2.lon - p1.lon);

    const lat1 = degreesToRadians(p1.lat);
    const lat2 = degreesToRadians(p2.lat);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadiusKm * c;
  }

  toBounds({lon, lat}) {
    return new mapboxgl.LngLat(lon, lat).toBounds(INITIAL_MAP_RADIUS);
  }
}


export default new LocationService()