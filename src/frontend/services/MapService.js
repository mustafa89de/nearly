import mapboxgl from "mapbox-gl";
import {MAP_ID} from "../constants";

const STYLE = 'mapbox://styles/mapbox/light-v10';

class MapService {
  initMap({center, zoom, bounds, controlPosition}) {
    return new Promise(resolve => {
      mapboxgl.accessToken = MAPBOX_TOKEN; // Wird beim compilieren durch Webpack Define Plugin ersetzt

      let options = {
        container: MAP_ID,
        style: STYLE
      };

      if (bounds) {
        options.bounds = bounds
      } else {
        options.center = {lon: center.longitude, lat: center.latitude};
        options.zoom = zoom
      }

      this.map = new mapboxgl.Map(options);
      this.map.addControl(new mapboxgl.NavigationControl(), controlPosition);
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

  setCenter({lon, lat}) {
    this.map.flyTo({
      center: {
        lon,
        lat
      }
    });
  }

  getCenter() {
    return this.map.getCenter();
  }

  addMarker({lon, lat, onClick, text}) {
    const element = document.createElement('div');
    element.className = 'map-marker';
    element.innerText = text;
    if (onClick) {
      element.addEventListener('click', onClick);
    }

    const marker = new mapboxgl.Marker(element);
    marker.setLngLat({
      lon,
      lat
    });
    marker.addTo(this.map);

    return marker;
  }
}

export default new MapService();