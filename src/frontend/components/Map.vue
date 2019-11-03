<template>
  <section id="map"></section>
</template>

<script>
  import MapService from "../services/MapService";

  export default {
    props: {
      'initialCenter': Object,
      'initialZoom': Number,
      'initialBounds': Array,
      'markers': Array
    },
    data: function () {
      return {
        markerRefs: []
      }
    },
    watch: {
      markers: function (markers) {
        // remove old ones
        this.markerRefs.forEach(ref => {
          ref.remove();
        });

        // add and store new ones
        this.markerRefs = markers.map(({lon, lat}, index) => {
          return MapService.addMarker({
            lon,
            lat,
            text: index + 1,
            onClick: () => this.handleClick(index)
          });
        });
      }
    },
    methods: {
      handleClick(index) {
        this.$emit('markerClick', index)
      },
      handlePositionChange(bounds) {
        const p1 = bounds.getSouthWest();
        const p2 = bounds.getNorthEast();

        const newBounds = [{lon: p1.lng, lat: p1.lat}, {lon: p2.lng, lat: p2.lat}];
        this.$emit('mapUpdate', newBounds)
      }
    },
    mounted: async function () {
      await MapService.initMap({
        center: this.initialCenter,
        zoom: this.initialZoom,
        bounds: this.initialBounds
      });
      MapService.onDragEnd(this.handlePositionChange);
      MapService.onZoomEnd(this.handlePositionChange);
    }
  }
</script>

<style lang="scss">
  .map-marker {
    background: #db0000;
    border: 3px solid #fff;
    border-radius: 9999px;
    height: 35px;
    width: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 18px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    cursor: pointer;
    font-family: "Poppins", Arial, Helvetica, sans-serif;
  }
</style>

<style scoped lang="scss">
</style>
