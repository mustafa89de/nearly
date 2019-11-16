<template>
  <section id="map"></section>
</template>

<script>
  import MapService from "../services/MapService";
  let markerRefs = [];

  export default {
    props: {
      'initialBounds': Object,
      'markers': Array,
      'hideNumbers': false,
      'controlPosition': String,
      'disabled': Boolean
    },
    watch: {
      markers: function () {
        this.updateMarkers();
      }
    },
    methods: {
      handleMarkerClick(index) {
        this.$emit('markerClick', index)
      },
      handlePositionChange(bounds) {
        this.$emit('mapUpdate', bounds)
      },
      handleMapClick(e) {
        this.$emit('mapClick', e)
      },
      updateMarkers() {
        markerRefs.forEach(ref => {
          ref.remove();
        });

        if (!this.markers) return; // abort

        // add and store new ones
        markerRefs = this.markers.map(({lon, lat}, index) => {
          return MapService.addMarker({
            lon,
            lat,
            text: this.hideNumbers ? "" : index + 1,
            onClick: () => this.handleMarkerClick(index)
          });
        });
      }
    },
    mounted: async function () {
      await MapService.initMap({
        bounds: this.initialBounds,
        controlPosition: this.controlPosition,
        disabled: this.disabled
      });
      MapService.onDragEnd(this.handlePositionChange);
      MapService.onZoomEnd(this.handlePositionChange);
      MapService.onClick(this.handleMapClick);
      this.updateMarkers();
    }
  }
</script>

<style lang="scss">
  @import "../assets/variables";

  .map-marker {
    background: $red;
    border: 3px solid #fff;
    border-radius: 9999px;
    height: 35px;
    width: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 18px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
    cursor: pointer;
    font-family: "Poppins", Arial, Helvetica, sans-serif;
  }
</style>

<style scoped lang="scss">
</style>
