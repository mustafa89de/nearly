const mapboxgl = require("mapbox-gl");

export const ENDPOINTS = {
  USER: '/api/user',
  EVENT: '/api/event',
  LOGIN: '/api/login',
  EVENTPARTICIPATION: '/api/participation/',
  PUSH: '/api/push'
};

export const MAP_ID = 'map';
export const PICKER_FALLBACK_RADIUS = 100;
export const ONE_DAY = 4 * 60 * 60 * 1000;

export const FALLBACK_HOME_POSITION = {
  lon: 13.41569879,
  lat: 52.50225623
};

export const MAP_BOX_STYLE = 'mapbox://styles/mapbox/light-v10';

export const GERMANY_BOUNDS = new mapboxgl.LngLat(10.526867, 51.036410).toBounds(500000);

export const ONE_LONG_DEGREE = 111.320;
export const ONE_LAT_DEGREE = 110.574;

export const EARTH_RADIUS_KM = 6371;

const initialTime = new Date();
if (initialTime.getHours() > 18) initialTime.setDate(initialTime.getDate() + 1);
initialTime.setHours(20);
initialTime.setMinutes(0);
initialTime.setSeconds(0);
initialTime.setMilliseconds(0);

export const INITIAL_EVENT = {
  name: '',
  description: '',
  lat: null,
  lon: null,
  time: initialTime.toString()
};