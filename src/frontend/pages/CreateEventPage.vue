<template>
  <article>
    <header>
      <h1>Event erstellen</h1>
    </header>
    <form @submit="handleEventCreation">
      <text-input placeholder="Name" v-model="name"/>
      <textarea placeholder="Beschreibung" v-model="description"></textarea>
      <text-input icon-type="calendar" placeholder="Datum" type="date" v-model="date"/>
      <text-input icon-type="clock" id="timeField" placeholder="Uhrzeit" type="time" v-model="time"/>
      <location-picker @save="handleLocationSave" :send-initial-change="true"/>
      <p id="error" v-if="errorMessage">{{errorMessage}}</p>
      <button-submit type="submit" text="Erstellen"
                     :disabled="!name || !latitude || !longitude || !time"/>
    </form>
  </article>
</template>

<script>
  import TextInput from "../components/TextInput.vue";
  import Button from "../components/Button.vue";
  import EventService from "../services/EventService";
  import LocationPicker from "../components/LocationPicker";

  export default {
    data: function () {
      return {
        name: '',
        description: '',
        latitude: null,
        longitude: null,
        date: this.formatDate(this.getInitialDate()),
        time: this.formatTime(this.getInitialTime()),
        errorMessage: null
      };
    },
    components: {
      "location-picker": LocationPicker,
      "text-input": TextInput,
      "button-submit": Button
    },
    computed: {
      mergedDateTime: function () {
        const [year, month, day] = this.date.split("-"); // Format is always yyyy-mm-dd
        const [hours, minutes] = this.time.split(":"); // Format is always hh:mm
        return new Date(year || 0, month || 0, day || 0, hours || 0, minutes || 0); // If splitting fails default is 0
      }
    },
    methods: {
      handleEventCreation: async function (e) {
        e.preventDefault();
        try {
          await EventService.createEvent(this.name, this.description, this.latitude, this.longitude, this.mergedDateTime);
          this.$router.push('/');
        } catch (err) {
          this.errorMessage = "Ein unbekannter Fehler ist aufgetreten."
        }
      },
      handleLocationSave: function ({lon, lat}) {
        this.longitude = lon;
        this.latitude = lat;
      },
      formatDate: function (date) {
        const year = date.getFullYear();
        let month = date.getMonth() + 1;
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
      getInitialDate: function () {
        const ONE_DAY = 24 * 60 * 60 * 1000;
        const today = new Date();
        const tomorrow = today.getTime() + ONE_DAY;
        const initialDate = new Date(tomorrow);
        return initialDate;
      },
      getInitialTime: function () {
        const initialTime = new Date();
        initialTime.setHours(20);
        initialTime.setMinutes(0);
        initialTime.setSeconds(0);
        initialTime.setMilliseconds(0);
        return initialTime;
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../assets/variables";
  @import "../assets/mixins";

  article {
    @include pageCard;
    padding: 25px;
    display: flex;
    flex-direction: column;
    flex: 1;

    > header {
      flex: none;

      > h1 {
        @include textTitle;
        margin: 0;
      }
    }

    > form {
      flex: 1;

      display: flex;
      flex-direction: column;
      align-items: stretch;


      > .input {
        margin-top: 40px;

        &#timeField {
          margin-top: 25px;
          margin-bottom: 25px;
        }
      }

      > textarea {
        background: rgba(131, 141, 154, 0.05);
        padding: 10px;
        margin-top: 50px;
        color: $font-col-light;

        border: 0;
        border-bottom: 1px solid #838D9A;
        outline: 0;
        height: 120px;
        font-size: 18px;

        @include textBody;
        line-height: 21px;
        display: flex;
        align-items: flex-end;
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

      #error {
        color: $font-col-error;
        margin: 0 auto 25px;
        font-weight: bold;
      }

      > input[type="submit"] {
        align-self: center;
        margin: 0 10px;
      }

      .picker {
        margin: 25px 0 50px;
      }
    }
  }


</style>