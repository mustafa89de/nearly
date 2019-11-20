import mapboxgl from "mapbox-gl";
import {GERMANY_BOUNDS, MAP_ID} from "../constants";

const STYLE = 'mapbox://styles/mapbox/light-v10';

class MapService {
  constructor() {
    this.controls = new mapboxgl.NavigationControl();
    this.controlPosition = null;
  }

  initMap({bounds, controlPosition, disabled}) {
    return new Promise(resolve => {
      mapboxgl.accessToken = MAPBOX_TOKEN; // Wird beim compilieren durch Webpack Define Plugin ersetzt

      this.controlPosition = controlPosition || 'top-right';

      let options = {
        container: MAP_ID,
        style: STYLE
      };

      if (bounds) {
        options.bounds = bounds
      } else {
        options.bounds = GERMANY_BOUNDS;
      }

      options.interactive = !disabled;

      this.map = new mapboxgl.Map(options);
      if (disabled !== true) {
        this.addControls()
      }
      this.map.on('load', () => {
        resolve();
      });
    });
  };

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
    this.map.removeControl(this.controls);
  }

  addControls() {
    this.map.addControl(this.controls, this.controlPosition);
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
    this.map.fitBounds(bounds, {speed: 2})
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
}

export default new MapService();