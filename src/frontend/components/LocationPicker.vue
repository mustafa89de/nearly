<template>
  <section
      :class="[{'minimized' : minimized}, 'picker']"
      @click="handleContainerClick"
  >
    <map-box
        :disabled="minimized"
        @mapClick="handleMapClick"
        :showRadius="showRadius"
        @afterInit="drawRadius"
    />
    <footer v-if="!minimized">
      <radius-slider class="radius" v-if="showRadius" @onChange="drawRadius" :radius="getRadius"/>
      <custom-button type="button" text="Fertig" @click="handleSave"/>
    </footer>
  </section>
</template>

<script>
  import Map from "./Map";
  import MapService from "../services/MapService";
  import LocationService from "../services/LocationService";
  import Button from "./Button";
  import RadiusSlider from "./RadiusSlider";
  import {PICKER_FALLBACK_RADIUS} from "../constants";

  let marker;
  let lastMinimized = null;

  export default {
    props: {
      sendInitialChange: Boolean,
      showHomePosition: Boolean,
      location: Object,
      showRadius: Boolean,
      propRadius: Number
    },
    components: {
      "map-box": Map,
      "custom-button": Button,
      "radius-slider": RadiusSlider
    },
    data: function () {
      return {
        minimized: true,
        initialBounds: null,
        lat: null,
        lon: null,
        radius: this.propRadius
      }
    },
    updated: function () {
      if (lastMinimized !== this.minimized) {
        MapService.resize();
        if (this.minimized) {
          let currentLocation;
          if (this.lon && this.lat) {
            currentLocation = {lon: this.lon, lat: this.lat};
          } else {
            currentLocation = this.location;
          }
          MapService.setCenter(currentLocation);
        }
      }
    },
    methods: {
      handleContainerClick: function () {
        if (this.minimized) {
          this.maximize()
        }
      },
      handleMapClick: function (lonLat) {
        if (!this.minimized) {
          marker.setLngLat(lonLat);
          this.handleMarkerDrag(lonLat)
        }
      },
      handleMarkerDrag: function ({lat, lon}) {
        this.lat = lat;
        this.lon = lon;
        if (this.showRadius) MapService.drawRadius({lon, lat});
        MapService.setCenter({lon, lat})
      },
      handleSave: function (e) {
        e.preventDefault();
        e.stopPropagation();
        this.$emit('save', {lon: this.lon, lat: this.lat, radius: this.radius});
        this.minimize();
      },
      maximize: function () {
        this.minimized = false;
        MapService.enableInteractions();
        MapService.addControls();
        if (marker) {
          marker.setDraggable(true);
        }
      },
      minimize: function () {
        this.minimized = true;
        MapService.disableInteractions();
        MapService.removeControls();
        if (marker) {
          marker.setDraggable(false);
        }
      },
      drawRadius: async function (radius) {
        if (!radius) this.radius = this.propRadius;
        else this.radius = radius;
        MapService.calcRadiusCoords({lon: this.lon, lat: this.lat}, this.radius);
        MapService.drawRadius({lon: this.lon, lat: this.lat});
        MapService.fadeRadius();
      }
    },
    async created() {
      if (this.showHomePosition) {
        const {lon, lat} = await LocationService.getHomePosition();
        this.lat = lat;
        this.lon = lon;
        marker = MapService.addMarker({lon, lat, draggable: false, onDragEnd: this.handleMarkerDrag});
        if (this.sendInitialChange === true) {
          this.$emit('save', {lon: this.lon, lat: this.lat});
        }
        if (this.showRadius) {
          marker.on("drag", () => {
            const {lng, lat} = marker.getLngLat();
            MapService.drawRadius({lon: lng, lat: lat});
          });
        }
        const pickerRadius = this.propRadius || PICKER_FALLBACK_RADIUS;
        const bounds = LocationService.toBounds({lon, lat}, pickerRadius);
        MapService.setBounds(bounds);
      }
    },
    watch: {
      location: function (newValue, oldValue) {
        if (newValue !== oldValue) {
          if (marker) {
            marker.remove();
            marker = null;
          }

          const {lon, lat} = newValue;
          const bounds = LocationService.toBounds({lon, lat}, PICKER_FALLBACK_RADIUS);
          MapService.setBounds(bounds);
          marker = MapService.addMarker({lon, lat, draggable: false, onDragEnd: this.handleMarkerDrag})
        }
      },
      propRadius: function (newValue) {
        // propRadius sometimes starts as null but gets set later on, which is why we need to
        // watch for changes and set the new bounds accordingly
        const bounds = LocationService.toBounds({lon: this.lon, lat: this.lat}, newValue);
        MapService.setBounds(bounds);
      }
    },
    computed: {
      getRadius: function () {
        return parseInt(this.radius) || parseInt(this.propRadius);
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../assets/variables";
  @import "../assets/mixins";

  section.picker {
    padding: 0;

    display: flex;
    flex-direction: column;

    #map {
      position: relative;
      flex: 1;
    }

    > footer {
      flex: none;
      padding: 25px 50px 25px;
      border-radius: 50px 50px 0 0;
      background: $bg-col-primary;
      z-index: 2;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 500px;

      @media screen and (min-width: 500px) {
        margin: auto auto 0;
      }

      > .radius {
        width: 100%;
        max-width: 400px;
        margin: 0 auto 25px auto;
      }

      > input[type="button"] {
        width: 100%;
        max-width: 400px;
        margin: 0 auto;
        display: block;
      }
    }

    &.minimized {
      position: relative;
      height: 200px;
      flex: none;
    }

    &:not(.minimized) {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: 0;
      z-index: 3;

      > #map {
        margin-bottom: -50px;

        @media screen and (min-width: 500px) {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 56px; // nav bar height
          flex: initial;
        }
      }
    }
  }
</style>