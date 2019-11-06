<template>
  <article>
    <mapbox
        v-if="isLoaded"
        :initialBounds="initialBounds"
        :markers="markers"
        @markerClick="handleMarkerClick"
        @mapUpdate="handleMapUpdate"
    />
    <section v-if="isLoaded" id="events">
      <h2>Für dich</h2>
      <horizontal-event-list :events="events" @click="handleEventClick"/>
    </section>
    <transition name="fade">
      <p v-if="!isLoaded" class="loader">Lädt ...</p>
    </transition>
  </article>
</template>

<script>
  import Map from '../components/Map';
  import EventService from "../services/EventService";
  import HorizontalEventList from "../components/HorizontalEventList";
  import LocationService from "../services/LocationService";
  import {INITIAL_MAP_RADIUS} from "../constants";

  const mapboxgl = require("mapbox-gl");

  export default {
    components: {
      HorizontalEventList,
      "mapbox": Map
    },
    data: function () {
      return {
        events: null,
        initialBounds: null
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
      isLoaded() {
        return !!this.initialBounds && !!this.events;
      }
    },
    created: async function () {
      const homePosition = await LocationService.getHomePosition(); // will never catch
      const homeLL = mapboxgl.LngLat.convert(homePosition);

      this.initialBounds = homeLL.toBounds(INITIAL_MAP_RADIUS);
      this.fetchEvents(this.initialBounds);
    },
    methods: {
      handleMarkerClick: function (index) {
        this.scrollTo(index);
      },
      handleEventClick: function (index) {
        this.$router.push('/event/' + this.events[index].id);
      },
      handleMapUpdate: function (bounds) {
        this.fetchEvents(bounds)
      },
      fetchEvents: async function (bounds) {
        try {
          this.events = await EventService.getAllEvents(bounds);
        } catch (e) {
          this.events = [];
          console.error(e);
        }
      },
      scrollTo: function (index) {
        const listItem = document.querySelector('.eventListItem:nth-child(' + (index + 1) + ')');
        const list = document.querySelector('.horizontalEventList');
        list.scrollTo({
          top: 0,
          left: listItem.offsetLeft - 25, // list padding
          behavior: 'smooth'
        });
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../assets/variables";

  article {
    min-height: 100%;
    min-width: 100%;
    display: flex;
    flex: 1;
  }

  #events {
    z-index: 1;
    position: absolute;
    background: #fff;
    width: 100%;
    max-width: 500px;
    bottom: 0;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    border-radius: 50px 50px 0 0;
    padding: 50px 0 25px;

    > h2 {
      font-family: Poppins, sans-serif;
      font-size: 18px;
      line-height: 27px;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      margin: 0 25px 25px;
    }

    > ul {
      padding-left: 25px;
    }
  }

  .loader {
    display: flex;
    font-family: "Poppins", sans-serif;
    font-size: 28px;

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    font-weight: bold;
    margin: 0;
    background: $bg-col-secondary;
    align-items: center;
    justify-content: center;
    color: $font-col-secondary;
    letter-spacing: 0.15em;
    text-transform: uppercase;
  }

  .fade-leave-active {
    opacity: 0;
    transition: .8s;
  }
</style>

<style lang="scss">
  #map {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;

    @media screen and (max-width: 500px) {
      bottom: 277px - 50px; // events section height minus border-radius
      height: initial;
    }
  }
</style>