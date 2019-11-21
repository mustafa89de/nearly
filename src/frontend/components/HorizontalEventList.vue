<template>
  <p v-if="!events" class="loader">Lädt...</p>
  <ul v-else-if="events.length > 0" class="horizontalEventList">
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
  @import "../assets/mixins";

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: row;
    overflow-x: scroll;

    > li {
      margin-right: 25px;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  .error, .loader {
    @include textBody;
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