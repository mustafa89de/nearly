<template>
  <article>
    <event-editor
        :event="event"
        title='Event bearbeiten'
        @change="handleChange"
        :showHomePosition="true"
    />
    <p id="error" v-if="errorMsg">{{errorMsg}}</p>
    <custom-button
        type="button"
        text="Speichern"
        @click="handleSave"
        :disabled="!event || !event.name || !event.lon || !event.lat || !event.time"
    />
  </article>
</template>

<script>
  import EventEditor from "../components/EventEditor";
  import EventService from "../services/EventService";
  import Button from "../components/Button";

  export default {
    components: {
      'event-editor': EventEditor,
      'custom-button': Button
    },
    data: function () {
      return {
        event: null,
        errorMsg: null
      }
    },
    created() {
      this.fetchEvent(this.$route.params.eid)
    },
    methods: {
      fetchEvent: async function (id) {
        try {
          this.event = await EventService.getEventById(id);
        } catch (e) {
          this.errorMsg = 'Ein unbekannter Fehler ist aufgetreten.'
        }
      },
      handleChange: function ({key, value}) {
        let oldEvent = {...this.event};
        oldEvent[key] = value;
        this.event = oldEvent;
      },
      handleSave: async function () {
        try {
          await EventService.saveEvent(this.event);
          this.$router.push('/event/' + this.event.id);
        } catch (e) {
          this.errorMsg = 'Ein unbekannter Fehler ist aufgetreten.'
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

    > input {
      align-self: center;
      margin-bottom: 25px;
    }

    #error {
      color: $font-col-error;
      margin: 0 auto 25px;
      font-weight: bold;
    }
  }

</style>