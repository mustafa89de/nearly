<template>
  <article>
    <event-editor
        :event="event"
        title='Event erstellen'
        @change="handleChange"
        showHomePosition
    />
    <p id="error" v-if="errorMsg">{{errorMsg}}</p>
    <custom-button
        type="button"
        text="Erstellen"
        @click="handleEventCreation"
        :disabled="!event.name || !event.lon || !event.lat || !event.time"
    />
  </article>
</template>

<script>
  import EventEditor from "../components/EventEditor";
  import Button from "../components/Button";
  import EventService from "../services/EventService";
  import {INITIAL_EVENT} from "../constants";

  export default {
    components: {
      'event-editor': EventEditor,
      'custom-button': Button
    },
    data: function () {
      return {
        event: INITIAL_EVENT,
        errorMsg: null
      }
    },
    methods: {
      handleChange: function ({key, value}) {
        this.event[key] = value;
      },
      handleEventCreation: async function (e) {
        e.preventDefault();
        try {
          const {name, description, lat, lon, time} = this.event;
          await EventService.createEvent(name, description, lat, lon, time);
          this.$router.push('/');
        } catch (err) {
          this.errorMsg = "Ein unbekannter Fehler ist aufgetreten."
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/variables";
  @import "../assets/mixins";

  article {
    display: flex;
    flex-direction: column;
    background: $bg-col-primary;
    @include pageCard;

    > input {
      align-self: center;
      margin-bottom: 25px;
    }

    #error {
      color: $font-col-error;
      margin: 0 auto 25px;
      font-weight: bold;
    }

    > section {
      padding: 0 25px 25px;
    }
  }
</style>