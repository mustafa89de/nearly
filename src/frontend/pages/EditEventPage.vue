<template>
  <article>
    <event-editor title='Event bearbeiten' v-model="event"/>
    <p id="error" v-if="errorMsg">{{errorMsg}}</p>
    <custom-button type="button" text="Speichern" @click="handleSave"/>
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