<template>
  <section
      :class="[{'minimized' : minimized}, 'picker']"
      @click="handleContainerClick"
  >
    <map-box
        :disabled="minimized"
        @mapClick="handleMapClick"
    />
    <footer v-if="!minimized">
      <button-submit type="submit" text="Fertig" @click="handleSave"/>
    </footer>
  </section>
</template>

<script>
  import Map from "./Map";
  import MapService from "../services/MapService";
  import LocationService from "../services/LocationService";
  import Button from "./Button";

  let marker;

  export default {
    components: {
      'map-box': Map,
      "button-submit": Button
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
      MapService.resize()
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
        marker.setDraggable(true);
      },
      minimize: function () {
        this.minimized = true;
        MapService.disableInteractions();
        MapService.removeControls();
        marker.setDraggable(false);
      }
    },
    async created() {
      const {lon, lat} = await LocationService.getHomePosition();
      this.lat = lat;
      this.lon = lon;
      const bounds = LocationService.toBounds({lon, lat});
      MapService.setBounds(bounds);
      marker = MapService.addMarker({lon, lat, draggable: false, onDragEnd: this.handleMarkerDrag})
      this.$emit('save', {lon: this.lon, lat: this.lat});
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

      > input[type="submit"] {
        width: 100%;
        max-width: 400px;
        margin: 0 auto;
        display: block;
      }
    }

    &.minimized {
      position: relative;
      height: 200px;
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