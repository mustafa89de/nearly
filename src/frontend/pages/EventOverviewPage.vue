<template>
  <article>
    <mapbox
        :initialCenter="initialCenter"
        :initialZoom="initialZoom"
        :markers="markers"
        @markerClick="handleMarkerClick"
        @mapUpdate="handleMapUpdate"
    />
  </article>
</template>

<script>
  import Map from '../components/Map';
  import EventService from "../services/EventService";

  export default {
    components: {
      "mapbox": Map
    },
    data: function () {
      return {
        events: []
      }
    },
    computed: {
      markers: function () {
        return this.events.map(({longitude, latitude}) => {
          return {
            longitude,
            latitude,
          }
        })
      },
      initialCenter: function () {
        return {longitude: 13.415684, latitude: 52.502270};
      },
      initialZoom: function () {
        return 16;
      },
    },
    mounted: function () {
      this.fetchEvents(this.initialCenter);
    },
    methods: {
      handleMarkerClick: function (index) {
        console.log('Clicked marker ' + index)
      },
      handleMapUpdate: function (center) {
        this.fetchEvents(center)
      },
      fetchEvents: async function (center) {
        console.log('Fetch events for:', center);
        try {
          this.events = await EventService.getAllEvents(center);
        } catch (e) {
          // TODO: error handling
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  article {
    min-height: 100%;
    min-width: 100%;
  }
</style>

<style lang="scss">
  #map {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
</style>