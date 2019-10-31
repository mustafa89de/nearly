<template>
  <article>
    <header>
      <h1>Erstelle dein Event</h1>
    </header>
    <form @submit="handleEventCreation">
      <input-text id="nameInput" class="input-text-wrapper" placeholder="Was?" v-model="name"/>
      <input-text id="descriptionInput" class="input-text-wrapper" placeholder="Was genau?" v-model="description"/>
      <input-text id="locationInput" class="input-text-wrapper" placeholder="Wo?" v-model="location"/>
      <button @click="setCurrentPosition">Genau hier!</button>
      <br>
      <input-text id="timeInput" class="input-text-wrapper" placeholder="Wann?" type="datetime-local" v-model="time"/>
      <p v-if="errorMessage">{{errorMessage}}</p>
      <button-submit class="create-button" type="submit" text="Event erstellen"
                     :disabled="!name || !location || !time"/>
    </form>
  </article>
</template>

<script>
  import TextInput from "../components/TextInput.vue";
  import Button from "../components/Button.vue";
  import EventService from "../services/EventService";
  import LocationService from "../services/LocationService";

  export default {
    data: function () {
      return {
        name: '',
        description: '',
        location: '',
        time: this.shortenDate(new Date()),
        errorMessage: null
      };
    },
    components: {
      "input-text": TextInput,
      "button-submit": Button
    },
    methods: {
      handleEventCreation: async function (e) {
        e.preventDefault();
        try {
          const createdEvent = await EventService.createEvent(this.name, this.description, this.location, this.time);
          this.$router.push('/');
        } catch (err) {
          this.errorMessage = "Ein unbekannter Fehler ist aufgetreten."
        }
      },
      setCurrentPosition: async function (e) {
        e.preventDefault();
        try {
          const location = await LocationService.getCurrentLocation();
          this.location = location.latitude + ',' + location.longitude;
        } catch (err) {
          console.error('Can not get current position', err.message)
        }
      },
      shortenDate: function (date) {
        return date.toISOString().replace(/:\d*.\d*Z$/, '')
      }
    }
  };
</script>

<style lang="scss">

</style>