<template>
  <article>
    <div v-if="error">{{error}}</div>
    <event-details class="eventDetails" :event="event"/>
    <map-comp hideNumbers="true" controlPosition="bottom-right"/>
  </article>
</template>

<script>
  import EventService from "../services/EventService";
  import EventDetails from "../components/EventDetails";
  import Map from "../components/Map.vue";
  import MapService from "../services/MapService";
  import LocationService from "../services/LocationService";

  export default {
    components: {
      'event-details': EventDetails,
      'map-comp': Map
    },

    data() {
      return {
        error: null,
        event: null
      }
    },

    methods: {
      async init() {
        try {
          this.event = await EventService.getEventById(this.$route.params.eid);
          const {lon, lat} = this.event;
          MapService.setBounds(LocationService.toBounds({lon, lat}));
          MapService.addMarker({lat, lon});
        } catch (err) {
          if (err.status === 404) {
            this.error = "Das gesuchte Event existiert leider nicht.";
          } else this.error = "Ein unbekannter Fehler ist aufgetreten.";
          console.error(err);
        }
      },
    },

    created() {
      this.init()
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/variables";
  @import "../assets/mixins";

  article {
    position: relative;
    flex: 1;

    display: flex;
    flex-direction: column;

    .eventDetails {
      z-index: 1;
      flex: 0;
    }

    #map {
      margin-top: -50px; // rounded borders
      position: relative;
      flex: 1;
      min-height: 250px;

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
</style>