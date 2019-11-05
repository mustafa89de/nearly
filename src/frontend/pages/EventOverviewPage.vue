<template>
  <article>
    <mapbox
        :initialBounds="initialBounds"
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

        return this.events.map(({lon, lat}) => {
          return {
            lon,
            lat,
          }
        })
      },
      initialBounds: function () {
        return [{lon: 13.411684, lat: 52.498270}, {lon: 13.419684, lat: 52.506270}];
      }
    },
    mounted: function () {
      this.fetchEvents(this.initialBounds);
    },
    methods: {
      handleMarkerClick: function (index) {
        console.log('Clicked marker ' + index)
      },
      handleMapUpdate: function (bounds) {
        this.fetchEvents(bounds)
      },
      fetchEvents: async function (bounds) {
        console.log('Fetch events for:', bounds);
        try {
          this.events = await EventService.getAllEvents(bounds);
        } catch (e) {
          console.error(e);
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