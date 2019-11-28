<template>
  <section>
    <header>
      <h1>{{title || '...'}}</h1>
    </header>
    <form>
      <text-input
          placeholder="Name"
          :value="name"
          @input="handleChange('name', $event)"
      />
      <textarea
          placeholder="Beschreibung"
          :value="description"
          @input="handleChange('description', $event.target.value)"
      ></textarea>
      <text-input
          icon-type="calendar"
          placeholder="Datum"
          type="date"
          v-model="date"
      />
      <text-input
          icon-type="clock"
          id="timeField"
          placeholder="Uhrzeit"
          type="time"
          v-model="time"
      />
      <location-picker
          @save="handleLocationChange"
          :location="lat && lon ? {lat, lon} : null"
          :show-home-position="showHomePosition"
          :send-initial-change="showHomePosition"
      />
    </form>
  </section>
</template>

<script>
  import TextInput from "../components/TextInput.vue";
  import Button from "../components/Button.vue";
  import LocationPicker from "../components/LocationPicker";

  export default {
    props: {
      title: String,
      showHomePosition: Boolean,
      name: String,
      description: String,
      lat: Number,
      lon: Number,
      datetime: String,
    },
    data: function () {
      return {
        date: this.formatDate(this.datetime),
        time: this.formatTime(this.datetime),
      }
    },
    components: {
      "location-picker": LocationPicker,
      "text-input": TextInput,
      "button-submit": Button
    },
    methods: {
      formatDate(datetime) {
        const date = new Date(datetime);
        const year = date.getFullYear();
        let month = date.getMonth() + 1;
        if (month < 10) month = '0' + month;

        let day = date.getDate();
        if (day < 10) day = '0' + day;

        return `${year}-${month}-${day}`;
      },
      formatTime(datetime) {
        const date = new Date(datetime);
        let hours = date.getHours();
        if (hours < 10) hours = '0' + hours;

        let minutes = date.getMinutes();
        if (minutes < 10) minutes = '0' + minutes;

        return `${hours}:${minutes}`;
      },
      handleChange: function (key, value) {
        this.$emit('change', {key, value});
      },
      handleLocationChange: function ({lon, lat}) {
        this.handleChange('lat', lat);
        this.handleChange('lon', lon);
      },
      handleDateTimeChange: function (date, time) {
        let [year, month, day] = date.split("-"); // Format is always yyyy-mm-dd

        if (!isNaN(month)) {
          month = parseInt(month) - 1
        }

        const [hours, minutes] = time.split(":"); // Format is always hh:mm

        const mergedDateTime = new Date(year || 0, month || 0, day || 0, hours || 0, minutes || 0); // If splitting fails default is 0
        this.$emit('change', {key: 'time', value: mergedDateTime.toString()});
      }
    },
    watch: {
      date: function (newDate) {
        this.handleDateTimeChange(newDate, this.time)
      },
      time: function (newTime) {
        this.handleDateTimeChange(this.date, newTime)
      },
    }
  };
</script>

<style scoped lang="scss">
  @import "../assets/variables";
  @import "../assets/mixins";

  section {
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
        background: $text-field-col;
        padding: 10px;
        margin-top: 50px;
        color: $font-col-light;

        border: 0;
        border-bottom: 1px solid $light-black;
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

      .picker {
        margin: 25px 0 50px;
      }
    }
  }

</style>