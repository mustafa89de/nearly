const mapboxgl = require("mapbox-gl");

export const ENDPOINTS = {
  USER: '/api/user',
  EVENT: '/api/event',
  LOGIN: '/api/login',
  EVENTPARTICIPATION: '/api/participation/'
};

export const MAP_ID = 'map';
export const INITIAL_MAP_RADIUS = 300;

export const FALLBACK_HOME_POSITION = {
  lon: 13.41569879,
  lat: 52.50225623
};

export const GERMANY_BOUNDS = new mapboxgl.LngLat(10.526867, 51.036410).toBounds(500000);


const ONE_DAY = 24 * 60 * 60 * 1000;
const today = new Date();
const tomorrow = today.getTime() + ONE_DAY;
const initialTime = new Date(tomorrow);
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