<template>
  <section>
    <h2>{{ user ? user.username : '...'}}</h2>
    <p>
    <pre>{{ user ? user.description: '...' }}</pre>
    </p>
    <h3 v-if="own">Meine Veranstaltungen</h3>
    <h3 v-else-if="!user">Events von ...</h3>
    <h3 v-else>Events von {{this.user.username}}</h3>
    <event-list hideNumbers :events="formattedEvents" @click="handleEventClick"/>
  </section>
</template>

<script>
  import HorizontalEventList from "../components/HorizontalEventList";

  export default {
    props: {
      user: null,
      own: Boolean
    },
    components: {
      "event-list": HorizontalEventList
    },
    computed: {
      formattedEvents: function () {
        if (!this.user) return null;

        return this.user.hostedEvents.map(event => ({
          title: event.name,
          description: event.description,
          lat: event.latitude,
          lon: event.longitude,
          time: event.time
        }));
      }
    },
    methods: {
      handleEventClick: function (index) {
        this.$router.push('/event/' + this.user.hostedEvents[index].id);
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../assets/variables";
  @import "../assets/mixins";

  section {
    color: $font-col-primary;

    h2 {
      @include textBodyTitle;
      margin: 25px;
    }

    h3 {
      @include textTitle;
      margin: 0 25px 25px;
    }

    p {
      @include textBody;
      margin: 0 25px 25px 25px;
      padding: 10px;
      height: 150px;
      background-color: $text-field-col;
      overflow-y: auto;

      pre {
        margin: 0;
        white-space: pre-line;
        hyphens: auto;
      }
    }

    .horizontalEventList {
      padding: 0 0 0 25px;
    }
  }
</style>