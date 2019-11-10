<template>
  <article>
    <div v-if="isLoading" > Loading...</div>
    <div v-if="error">{{error}}</div>
    <event-details class="eventDetails" v-if="event" :event="event"/>
    <map-comp v-if="event" :initialCenter="mapcenter" :initialZoom="12"/>
  </article>
</template>

<script>
  import EventService from "../services/EventService";
  import EventDetails from "../components/EventDetails";
  import Map from "../components/Map.vue";

  import AuthService from "../services/AuthService";

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
      mapcenter: function(){
        if(this.event) return {longitude: this.event.loc.coordinates[0], latitude: this.event.loc.coordinates[1]};
        else return {};
      },
    },

    methods: {
      async init() {
        try {
          this.isLoading = true;
          this.event  = await EventService.getEventById(this.$route.params.eid);
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

    mounted() {
      this.init()
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/variables";
  @import "../assets/mixins";
  
  article{
    position: relative;
    flex: 1;
    min-height: 100%;
    min-width: 100%;
  }
  
  .eventDetails{
    z-index: 1;
  }
  
  #map {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
  }
</style>