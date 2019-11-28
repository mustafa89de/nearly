<template>
  <article>
    <event-editor
        :name="name"
        :description="description"
        :lon="lon"
        :lat="lat"
        :datetime="time"
        title='Event bearbeiten'
        @change="handleChange"
        :showHomePosition="true"
    />
    <p id="error" v-if="errorMsg">{{errorMsg}}</p>
    <custom-button type="button" text="Erstellen" @click="handleEventCreation"
                   :disabled="!name || !lon || !lat || !time"/>

  </article>
</template>

<script>
  import EventEditor from "../components/EventEditor";
  import Button from "../components/Button";
  import EventService from "../services/EventService";

  const ONE_DAY = 24 * 60 * 60 * 1000;
  const today = new Date();
  const tomorrow = today.getTime() + ONE_DAY;
  const initialTime = new Date(tomorrow);
  initialTime.setHours(20);
  initialTime.setMinutes(0);
  initialTime.setSeconds(0);
  initialTime.setMilliseconds(0);


  export default {
    components: {
      'event-editor': EventEditor,
      'custom-button': Button
    },
    data: function () {
      return {
        name: '',
        description: '',
        lat: null,
        lon: null,
        time: initialTime.toString(),
        errorMsg: null
      }
    },
    methods: {
      handleChange: function ({key, value}) {
        this[key] = value;
      },
      handleEventCreation: async function (e) {
        e.preventDefault();
        try {
          await EventService.createEvent(this.name, this.description, this.lat, this.lon, this.time);
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