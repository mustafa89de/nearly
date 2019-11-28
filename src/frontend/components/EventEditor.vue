<template>
  <section>
    <header>
      <h1>{{title || '...'}}</h1>
    </header>
    <form>
      <text-input
          placeholder="Name"
          :value="value ? value.name : '...'"
          @input="handleChange('name', $event)"
      />
      <textarea
          placeholder="Beschreibung"
          :value="value ? value.description : '...'"
          @input="handleChange('description', $event.target.value)"
      ></textarea>
      <text-input
          icon-type="calendar"
          placeholder="Datum"
          type="date"
          :value="value ? this.formattedDate : ''"
          @input="handleChange('date', $event)"
      />
      <text-input
          icon-type="clock"
          id="timeField"
          placeholder="Uhrzeit"
          type="time"
          :value="value ? this.formattedTime : ''"
          @input="handleChange('time', $event)"
      />
      <location-picker
          @save="handleChange('location', $event)"
          :location="value ? {lat: value.lat, lon:value.lon} :null"
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
      value: Object
    },
    components: {
      "location-picker": LocationPicker,
      "text-input": TextInput,
      "button-submit": Button
    },
    computed: {
      formattedDate: function () {
        if (!this.value.time) return null;

        const date = new Date(this.value.time);
        const year = date.getFullYear();
        let month = date.getMonth() + 1;
        if (month < 10) month = '0' + month;

        let day = date.getDate();
        if (day < 10) day = '0' + day;

        return `${year}-${month}-${day}`;
      },
      formattedTime: function () {
        if (!this.value.time) return null;

        const date = new Date(this.value.time);
        let hours = date.getHours();
        if (hours < 10) hours = '0' + hours;

        let minutes = date.getMinutes();
        if (minutes < 10) minutes = '0' + minutes;

        return `${hours}:${minutes}`;
      }
    },
    methods: {
      handleChange: function (key, value) {
        let newEvent = this.value;
        newEvent[key] = value;
        this.$emit('input', newEvent);
      }
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