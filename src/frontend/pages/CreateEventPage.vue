<template>
  <article>
    <header>
      <h1>Event erstellen</h1>
    </header>
    <form @submit="handleEventCreation">
      <text-input placeholder="Name" v-model="name"/>
      <textarea placeholder="Beschreibung" v-model="description"></textarea>
      <text-input icon-type="latitude" placeholder="Latitude" v-model="latitude"/>
      <text-input icon-type="longitude" id="longField" placeholder="Longitude" v-model="longitude"/>
      <text-input icon-type="calendar" placeholder="Datum" type="date" v-model="date"/>
      <text-input icon-type="clock" id="timeField" placeholder="Uhrzeit" type="time" v-model="time"/>
      <p v-if="errorMessage">{{errorMessage}}</p>
      <button-submit @click="setCurrentPosition" type="button" text="Standort laden"/>
      <button-submit type="submit" text="Erstellen"
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
        latitude: '',
        longitude: '',
        date: this.formatDate(new Date()),
        time: this.formatTime(new Date()),
        errorMessage: null
      };
    },
    components: {
      "text-input": TextInput,
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
      formatDate: function (date) {
        const year = date.getFullYear();
        let month = date.getMonth();
        if (month < 10) month = '0' + month;

        let day = date.getDate();
        if (day < 10) day = '0' + day;

        return `${year}-${month}-${day}`;
      },
      formatTime: function (date) {
        let hours = date.getHours();
        if (hours < 10) hours = '0' + hours;

        let minutes = date.getMinutes();
        if (minutes < 10) minutes = '0' + minutes;

        return `${hours}:${minutes}`;
      },
      roundCoord: function (coord) {
        return parseFloat(coord.toFixed(7));
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../assets/variables";

  article {
    padding: 25px;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  header {
    flex: none;
  }

  form {
    flex: 1;

    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  h1 {
    font-family: Poppins, sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    margin: 0;
  }

  .input, section {
    margin-top: 40px;

    &#longField {
      margin-top: 25px;
    }

    &#timeField {
      margin-top: 25px;
      margin-bottom: 25px;
    }
  }

  input[type="button"] {
    align-self: center;
    margin: auto 10px 25px;
  }

  input[type="submit"] {
    align-self: center;
    margin: 0 10px;
  }

  textarea {
    background: rgba(131, 141, 154, 0.05);
    padding: 10px;
    margin-top: 50px;
    color: $font-col-light;

    border: 0;
    border-bottom: 1px solid #838D9A;
    outline: 0;
    height: 120px;
    font-size: 18px;

    font-family: Arimo, sans-serif;
    line-height: 21px;
    display: flex;
    align-items: flex-end;
    letter-spacing: 0.02em;
    resize: none;

    transition: 500ms ease;

    &::placeholder {
      color: $placeholder-col;
      transition: color 500ms ease;
    }

    &:focus {
      border-color: $font-col-active;
      color: $font-col-active;

      &::placeholder {
        color: $placeholder-col-active;
      }
    }
  }
</style>