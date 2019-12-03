<template>
  <section
      :class="[{'minimized' : minimized}, 'picker']"
      @click="handleContainerClick"
  >
    <map-box
        :disabled="minimized"
        @mapClick="handleMapClick"
        :showRadius="showRadius"
        @radiusCallback="drawRadius"
    />
    <footer v-if="!minimized">
      <custom-button type="button" text="Fertig" @click="handleSave"/>
    </footer>
  </section>
</template>

<script>
  import Map from "./Map";
  import MapService from "../services/MapService";
  import LocationService from "../services/LocationService";
  import Button from "./Button";

  let marker;
  let lastMinimized = null;

  export default {
    props: {
      sendInitialChange: Boolean,
      showHomePosition: Boolean,
      location: Object,
      showRadius: Boolean
    },
    components: {
      'map-box': Map,
      "custom-button": Button
    },
    data: function () {
      return {
        minimized: true,
        initialBounds: null,
        lat: null,
        lon: null
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
        if(this.showRadius) MapService.updateRadius({lon, lat}, 1);
        MapService.setCenter({lon, lat})
      },
      handleSave: function (e) {
        e.preventDefault();
        e.stopPropagation();
        this.$emit('save', {lon: this.lon, lat: this.lat});
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
      drawRadius: function () {
        MapService.updateRadius({ lon: this.lon, lat: this.lat}, 1);
      }
    },
    async created() {
      if (this.showHomePosition) {
        const {lon, lat} = await LocationService.getHomePosition();
        this.lat = lat;
        this.lon = lon;
        const bounds = LocationService.toBounds({lon, lat});
        MapService.setBounds(bounds);
        marker = MapService.addMarker({lon, lat, draggable: false, onDragEnd: this.handleMarkerDrag});
        if (this.sendInitialChange === true) {
          this.$emit('save', {lon: this.lon, lat: this.lat});
        }
        if(this.showRadius) {
          marker.on("drag", () => {
            const {lng, lat} = marker.getLngLat();
            MapService.updateRadius({lon: lng, lat: lat}, 1);
          });
        }
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
          const bounds = LocationService.toBounds({lon, lat});
          MapService.setBounds(bounds);
          marker = MapService.addMarker({lon, lat, draggable: false, onDragEnd: this.handleMarkerDrag})
        }
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
      position: static;
      flex: 1;
    }

    > footer {
      flex: none;
      padding: 50px 75px 25px;
      border-radius: 50px 50px 0 0;
      background: $bg-col-primary;
      z-index: 1;

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
      }
    }
  }
</style>