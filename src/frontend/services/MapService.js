import mapboxgl from "mapbox-gl";
import {
  GERMANY_BOUNDS,
  MAP_ID
} from "../constants";

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
        // if(showRadius){
        //   this.initRadius();
        // }
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
  // initRadius() {
  //   this.map.addSource("radius", {
  //     "type": "geojson",
  //     "data": {
  //       "type": "Feature"
  //     }
  //   });
  //   this.map.addLayer({
  //     "id": "testrectangle",
  //     "source": "radius",
  //     "type": "fill",
  //     "layout": {},
  //     "paint": {
  //       "fill-color": "#088",
  //       "fill-opacity": 0.8
  //     }
  //   });
  // }
  // updateRadius(lonlat, radius) {
  //   this.map.getSource("radius").setData({
  //     'type': 'Feature',
  //     'geometry': {
  //       'type': 'Polygon',
  //       'coordinates': [
  //         [
  //           [
  //             lonlat.lon,
  //             lonlat.lat
  //           ],
  //           [
  //             lonlat.lon + 0.005,
  //             lonlat.lat
  //           ],
  //           [
  //             lonlat.lon,
  //             lonlat.lat + 0.005
  //           ],
  //           [
  //             lonlat.lon,
  //             lonlat.lat
  //           ]
  //         ]
  //       ]
  //     }
  //   });
  // }
}

export default new MapService();