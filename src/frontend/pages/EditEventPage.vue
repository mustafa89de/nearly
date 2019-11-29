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
    <custom-button
        type="button"
        text="Löschen"
        @click="handleDelete"
        :disabled="!event"
    />
    <confirmation-modal
        v-if="showDeleteModal"
        title="Löschen"
        text="Bist du dir sicher, dass du das Event löschen möchtest?"
        confirm-text="Löschen"
        @confirm="confirmDelete"
        @abort="abortDelete"
    />
  </article>
</template>

<script>
  import EventEditor from "../components/EventEditor";
  import EventService from "../services/EventService";
  import Button from "../components/Button";
  import ConfirmationModal from "../components/ConfirmationModal";

  export default {
    components: {
      ConfirmationModal,
      'event-editor': EventEditor,
      'custom-button': Button
    },
    data: function () {
      return {
        event: null,
        errorMsg: null,
        showDeleteModal: false
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
        if (this.event) {
          this.event[key] = value;
        }
      },
      handleSave: async function () {
        try {
          await EventService.saveEvent(this.event);
          this.$router.push('/event/' + this.event.id);
        } catch (e) {
          this.errorMsg = 'Ein unbekannter Fehler ist aufgetreten.'
        }
      },
      handleDelete() {
        this.showDeleteModal = true
      },
      async confirmDelete() {
        try {
          await EventService.deleteEvent(this.event.id);
          this.showDeleteModal = false;
          this.$router.push('/me');
        } catch (e) {
          this.errorMsg = 'Ein unbekannter Fehler ist aufgetreten.';
          this.showDeleteModal = false;
        }
      },
      abortDelete() {
        this.showDeleteModal = false
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

      &:nth-of-type(2) {
        padding-top: 10px;
        padding-bottom: 10px;
        color: $button-col-primary;
        border: 5px solid $button-col-primary;
        background-color: $bg-col-primary;
      }
    }

    #error {
      color: $font-col-error;
      margin: 0 auto 25px;
      font-weight: bold;
    }
  }

</style>