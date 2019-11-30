<template>
  <article>
    <div v-if="isLoading"> Loading...</div>
    <div v-if="error">{{error}}</div>
    <event-details class="eventDetails" v-if="event" :event="event"/>
    <map-comp v-if="event" :initialBounds="bounds" :markers="markers" hideNumbers="true"
              controlPosition="bottom-right"/>
  </article>
</template>

<script>
  import EventService from "../services/EventService";
  import EventDetails from "../components/EventDetails";
  import Map from "../components/Map.vue";
  import LocationService from "../services/LocationService";

  export default {
    components: {
      'event-details': EventDetails,
      'map-comp': Map
    },

    data() {
      return {
        isLoading: false,
        error: null,
        event: null
      }
    },

    computed: {
      bounds: function () {
        const {lon, lat} = this.event;
        return LocationService.toBounds({lon, lat});
      },
      markers: function () {
        if (!this.event) return [];
        const {lon, lat} = this.event;
        return [{lon, lat}];
      }
    },

    methods: {
      async init() {
        try {
          this.isLoading = true;
          this.event = await EventService.getEventById(this.$route.params.eid);
          this.isLoading = false;
        } catch (err) {
          this.isLoading = false;
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
  }

  .eventDetails {
    z-index: 1;
    flex: 0;
  }

  #map {
    margin-top: -50px; // rounded borders
    position: relative;
    flex: 1;


    @media screen and (min-width: 500px) {
      margin-top: 0;
      height: auto;
      bottom: 56px; // nav bar height
      position: fixed;
      flex: initial;
    }
  }
</style>