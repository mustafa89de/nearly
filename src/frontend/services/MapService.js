import mapboxgl from "mapbox-gl";
import {MAP_ID} from "../constants";

const STYLE = 'mapbox://styles/mapbox/light-v10';

class MapService {
  initMap({center, zoom}) {
    return new Promise(resolve => {
      mapboxgl.accessToken = MAPBOX_TOKEN; // Wird beim compilieren durch Webpack Define Plugin ersetzt
      this.map = new mapboxgl.Map({
        container: MAP_ID,
        style: STYLE,
        center: {lon: center.longitude, lat: center.latitude},
        zoom
      });
      this.map.addControl(new mapboxgl.NavigationControl());
      this.map.on('load', () => {
        resolve();
      });
    });
  };

  on(eventName, handler) {
    this.map.on(eventName, handler);
  }

  onDragEnd(handler) {
    this.map.on('dragend', () => handler(this.map.getCenter()));
  }

  onZoomEnd(handler) {
    this.map.on('zoomend', () => handler(this.map.getCenter()));
  }

  setCenter({longitude, latitude}) {
    this.map.flyTo({
      center: {
        lon: longitude,
        lat: latitude
      }
    });
  }

  addMarker({longitude, latitude, onClick, text}) {
    const element = document.createElement('div');
    element.className = 'map-marker';
    element.innerText = text;
    if (onClick) {
      element.addEventListener('click', onClick);
    }

    const marker = new mapboxgl.Marker(element);
    marker.setLngLat({
      lon: longitude,
      lat: latitude
    });
    marker.addTo(this.map);

    return marker;
  }
}

export default new MapService();