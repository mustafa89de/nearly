<template>
  <ul class="horizontalEventList" v-if="events.length > 0">
    <event-list-item
        :key="item.id"
        v-for="(item, index) in events"
        :title="item.title"
        :description="item.description"
        :number="index + 1"
        :time="item.time"
        :lat="item.lat"
        :lon="item.lon"
        :hideNumber="hideNumbers"
        @click="() => handleClick(index)"
    />
  </ul>
  <p v-else class="error">Es konnten keine Events gefunden werden.</p>
</template>

<script>
  import EventListItem from "./EventListItem";
  import LocationService from "../services/LocationService";
  import MapService from "../services/MapService";

  export default {
    components: {EventListItem},
    props: {
      events: Array,
      hideNumbers: Boolean
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

  .error {
    font-family: Arimo, sans-serif;
    letter-spacing: 0.02em;
    background: $button-col-secondary;
    padding: 20px;
    border-radius: 25px;
    color: #fff;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    height: 150px;
    width: 250px;
    font-size: 18px;
    font-weight: normal;
    margin: 0 0 0 25px;

  }
</style>