<template>
  <article>
    <mapbox
        :markers="markers"
        @markerClick="handleMarkerClick"
        @mapUpdate="handleMapUpdate"
    />
    <section id="events">
      <h2>Events</h2>
      <horizontal-event-list :events="events" @click="handleEventClick"/>
    </section>
  </article>
</template>

<script>
  import Map from '../components/Map';
  import EventService from "../services/EventService";
  import HorizontalEventList from "../components/HorizontalEventList";
  import LocationService from "../services/LocationService";
  import MapService from "../services/MapService";
  import UserService from "../services/UserService";

  let intialMoveDone = false;

  export default {
    components: {
      HorizontalEventList,
      "mapbox": Map
    },
    data: function () {
      return {
        events: null
      }
    },
    computed: {
      markers: function () {
        if (!this.events) return null;
        return this.events.map(({lon, lat}) => {
          return {
            lon,
            lat,
          }
        })
      }
    },
    created: async function () {
      const initialBounds = await this.loadInitialBounds();

      MapService.on('moveend', () => {
        if (!intialMoveDone) {
          intialMoveDone = true;
          this.fetchEvents(initialBounds);
        }
      });
    },
    methods: {
      loadInitialBounds: async function () {
        const homePosition = await LocationService.getHomePosition();
        const radius = await UserService.getRadius();
        const bounds = LocationService.toBounds(homePosition, radius);
        MapService.setBounds(bounds);
        return bounds;
      },
      handleMarkerClick: function (index) {
        this.scrollTo(index);
      },
      handleEventClick: function (index) {
        this.$router.push('/event/' + this.events[index].id);
      },
      handleMapUpdate: function (bounds) {
        if (intialMoveDone) {
          this.fetchEvents(bounds)
        }
      },
      fetchEvents: async function (bounds) {
        const boundsData = {
          ne: bounds.getNorthEast(),
          sw: bounds.getSouthWest()
        };
        try {
          this.events = await EventService.getAllEvents(boundsData);
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
  @import "../assets/mixins";

  article {
    min-width: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;

    #map {
      flex: 1;
      position: relative;
      margin-bottom: -50px; // border-radius
      min-height: 250px;

      @media screen and (min-width: 500px) {
        position: fixed;
        top: 0;
        bottom: 56px;
        left: 0;
        right: 0;
        margin-bottom: 0;
      }
    }

    #events {
      flex: none;
      margin-top: auto;

      z-index: 2;
      background: $bg-col-primary;
      width: 100%;
      max-width: 500px;
      bottom: 0;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      border-radius: 50px 50px 0 0;
      padding: 50px 0 25px;

      > h2 {
        @include textTitle;
        margin: 0 25px 25px;
      }

      > ul {
        padding-left: 25px;
      }
    }
  }
</style>