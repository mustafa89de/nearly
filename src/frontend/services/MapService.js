import mapboxgl from "mapbox-gl";
import {
  GERMANY_BOUNDS,
  MAP_ID
} from "../constants";
import { POINT_CONVERSION_COMPRESSED } from "constants";

const STYLE = 'mapbox://styles/mapbox/light-v10';

class MapService {
  constructor() {
    this.controls = [
      new mapboxgl.NavigationControl(),
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      })
    ];
    this.controlPosition = null;
    this.radiusCoords = [];
  }

  initMap({bounds, controlPosition, disabled, showRadius}) {
    return new Promise(resolve => {
      mapboxgl.accessToken = MAPBOX_TOKEN; // Wird beim compilieren durch Webpack Define Plugin ersetzt

      this.controlPosition = controlPosition || 'top-right';

      let options = {
        container: MAP_ID,
        style: STYLE,
        attributionControl: false
      };

      if (bounds) {
        options.bounds = bounds;
      } else {
        options.bounds = GERMANY_BOUNDS;
      }

      options.interactive = !disabled;

      this.map = new mapboxgl.Map(options);
      if (disabled !== true) {
        this.addControls();
      }
      this.map.on('load', () => {
        if(showRadius) {
          this.initRadius();
        }
        resolve();
      });
    });
  }

  on(eventName, handler) {
    this.map.on(eventName, handler);
  }

  onDragEnd(handler) {
    this.map.on('dragend', () => handler(this.map.getBounds()));
  }

  onZoomEnd(handler) {
    this.map.on('zoomend', () => handler(this.map.getBounds()));
  }

  onClick(handler) {
    this.map.on('click', ({lngLat}) => handler({lon: lngLat.lng, lat: lngLat.lat}));
  }

  removeControls() {
    this.controls.forEach(control => {
      this.map.removeControl(control);
    });
  }

  addControls() {
    this.controls.forEach(control => {
      this.map.addControl(control, this.controlPosition);
    });
  }

  setCenter({lon, lat}) {
    this.map.flyTo({
      center: {
        lon,
        lat
      },
      speed: 0.6
    });
  }

  setBounds(bounds) {
    this.map.fitBounds(bounds, {speed: 2});
  }

  resize() {
    this.map.resize();
  }

  enableInteractions() {
    this.map.scrollZoom.enable();
    this.map.boxZoom.enable();
    this.map.dragRotate.enable();
    this.map.dragPan.enable();
    this.map.touchZoomRotate.enable();
    this.map.doubleClickZoom.enable();
    this.map.keyboard.enable();
  }

  disableInteractions() {
    this.map.scrollZoom.disable();
    this.map.boxZoom.disable();
    this.map.dragRotate.disable();
    this.map.dragPan.disable();
    this.map.touchZoomRotate.disable();
    this.map.doubleClickZoom.disable();
    this.map.keyboard.disable();
  }

  addMarker({lon, lat, onClick, text, onDragEnd}) {
    const element = document.createElement('div');
    element.className = 'map-marker';
    element.innerText = text || null;
    if (onClick) {
      element.addEventListener('click', onClick);
    }

    const marker = new mapboxgl.Marker(element);
    marker.setLngLat({
      lon,
      lat
    });

    if (onDragEnd) {
      marker.on('dragend', () => {
        const {lng, lat} = marker.getLngLat();
        onDragEnd({lon: lng, lat});
      });
    }

    marker.addTo(this.map);

    return marker;
  }
  initRadius() {
    this.map.addSource("radius", {
      "type": "geojson",
      "data": {
        "type": "Feature"
      }
    });
    this.map.addLayer({
      "id": "testrectangle",
      "source": "radius",
      "type": "fill",
      "layout": {},
      "paint": {
        "fill-color": "#166C72",
        "fill-opacity": 0.1
      }
    });
  }
  calcRadiusCoords(lonlat, radius) {
    this.radiusCoords = [];
    const distanceLon = radius / (111.320 * Math.cos((lonlat.lat * Math.PI) / 180));
    const distanceLat = radius / 110.574;
    const points = 64;
    let theta, x, y;

    for(let i = 0; i < points; i += 1){
      theta = (i / points) * (2 * Math.PI);
      x = distanceLon * Math.cos(theta);
      y = distanceLat * Math.sin(theta);

      this.radiusCoords.push([x, y]);
    }
    this.radiusCoords.push(this.radiusCoords[0]);
  }
  drawRadius(lonlat){
    let coords = this.radiusCoords.map(coord => {
      return [lonlat.lon + coord[0], lonlat.lat + coord[1]];
    });
    this.map.getSource("radius").setData({
      'type': 'Feature',
      'geometry': {
        'type': 'Polygon',
        'coordinates': [coords]
      }
    });
  }
}

export default new MapService();