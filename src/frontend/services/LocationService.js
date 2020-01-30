import {EARTH_RADIUS_KM, FALLBACK_HOME_POSITION} from "../constants";
import UserService from "./UserService";

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

  async getHomePosition() {
    try {
      const homePosition = await UserService.getHomePosition();
      const {latitude, longitude} = homePosition || await this.getCurrentLocation();

      return {
        lon: longitude,
        lat: latitude
      };
    } catch (e) {
      console.error(e);
      return FALLBACK_HOME_POSITION;
    }
  }

  getDistance(p1, p2) {
    function degreesToRadians(degrees) {
      return degrees * Math.PI / 180;
    }

    const dLat = degreesToRadians(p2.lat - p1.lat);
    const dLon = degreesToRadians(p2.lon - p1.lon);

    const lat1 = degreesToRadians(p1.lat);
    const lat2 = degreesToRadians(p2.lat);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return EARTH_RADIUS_KM * c;
  }

  toBounds({lon, lat}, radius) {
    return new mapboxgl.LngLat(lon, lat).toBounds(radius);
  }
}


export default new LocationService()
