<template>
  <ul class="horizontalEventList">
    <event-list-item
        v-for="(item, index) in events"
        :title="item.title"
        :description="item.description"
        :number="index + 1"
        :time="item.time"
        :distance="getDistance(item)"
        @click="() => handleClick(index)"
    />
  </ul>
</template>

<script>
  import EventListItem from "./EventListItem";
  import LocationService from "../services/LocationService";
  import MapService from "../services/MapService";

  export default {
    components: {EventListItem},
    props: {
      events: Array
    },
    methods: {
      isToday: function (date) {
        const today = new Date();
        return date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
      },
      isTomorrow: function (date) {
        const today = new Date();
        return date.getDate() === today.getDate() + 1 &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
      },
      handleClick: function (index) {
        this.$emit('click', index)
      },
      getDistance: function ({lon, lat}) {
        const center = MapService.getCenter();
        const distance = LocationService.getDistance({lon, lat}, {lon: center.lng, lat: center.lat});

        if (distance < 1) {
          return (distance*1000).toFixed() + 'm'
        } else {
          return distance.toFixed(1) + 'km'
        }

      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../assets/variables";

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: row;
    overflow: scroll;

    > li {
      margin-right: 25px;

      &:last-child {
        margin-right: 0;
      }
    }
  }
</style>