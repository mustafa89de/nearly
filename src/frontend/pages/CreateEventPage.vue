<template>
  <article>
    <header>
      <h1>Erstelle dein Event</h1>
    </header>
    <form @submit="handleEventCreation">
      <input-text id="nameInput" class="input-text-wrapper" placeholder="Was?" v-model="name"/>
      <input-text id="descriptionInput" class="input-text-wrapper" placeholder="Was genau?" v-model="description"/>
      <input-text id="latitudeInput" class="input-text-wrapper" type="number" placeholder="Wo?" v-model="latitude"
                  step="0.0000001"/>
      <input-text id="longitudeInput" class="input-text-wrapper" type="number" placeholder="Wo?" v-model="longitude"
                  step="0.0000001"/>
      <button @click="setCurrentPosition">Genau hier!</button>
      <br>
      <input-text id="timeInput" class="input-text-wrapper" placeholder="Wann?" type="datetime-local" v-model="time"/>
      <p v-if="errorMessage">{{errorMessage}}</p>
      <button-submit class="create-button" type="submit" text="Event erstellen"
                     :disabled="!name || !latitude || !longitude || !time"/>
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
        latitude: 0.0,
        longitude: 0.0,
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
          const createdEvent = await EventService.createEvent(this.name, this.description, this.latitude, this.longitude, this.time);
          this.$router.push('/');
        } catch (err) {
          this.errorMessage = "Ein unbekannter Fehler ist aufgetreten."
        }
      },
      setCurrentPosition: async function (e) {
        e.preventDefault();
        try {
          const {latitude, longitude} = await LocationService.getCurrentLocation();
          this.latitude = this.roundCoord(latitude);
          this.longitude = this.roundCoord(longitude);
        } catch (err) {
          console.error('Can not get current position', err.message)
        }
      },
      shortenDate: function (date) {
        return date.toISOString().replace(/:\d*.\d*Z$/, '')
      },
      roundCoord: function(coord) {
        return parseFloat(coord.toFixed(7));
      }
    }
  };
</script>

<style lang="scss">

</style>