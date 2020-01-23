<template>
  <li class="eventListItem" @click="handleClick">
    <p v-if="!this.hideNumber" class="number">{{number}}</p>
    <h4 class="title">{{title}}</h4>
    <p class="description">{{getDescription}}</p>
    <p class="meta">
      <span>{{formattedDate}}</span>
      <span>{{distance}}</span>
    </p>
  </li>
</template>

<script>
  import LocationService from '../services/LocationService';

  export default {
    props: {
      number: Number,
      title: String,
      description: String,
      lat: Number,
      lon: Number,
      time: String,
      hideNumber: Boolean
    },
    data: function () {
      return {
        distance: '...'
      }
    },
    computed: {
      formattedDate: function () {
        const date = new Date(this.time);

        let dayString;
        let timeString;

        if (this.isToday(date)) {
          dayString = 'Heute'
        } else if (this.isTomorrow(date)) {
          dayString = 'Morgen'
        } else {
          let day = date.getDate();
          if (day < 10) day = '0' + day;
          let month = date.getMonth() + 1;
          if (month < 10) month = '0' + month;
          dayString = `${day}.${month}.`
        }

        let hours = date.getHours();
        if (hours < 10) hours = '0' + hours;
        let minutes = date.getMinutes();
        if (minutes < 10) minutes = '0' + minutes;

        timeString = `${hours}:${minutes} Uhr`;

        return dayString + ', ' + timeString;
      },
      getDescription: function () {
        if (this.description) {
          return this.description.length < 100 ? this.description : this.description.substr(0, 100) + "...";
        }
        else {
          return "";
        }
      }
    },
    methods: {
      isToday: function (date) {
        const today = new Date();
        return date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
      },
      isTomorrow: function (date) {
        const today = new Date();
        return date.getDate() === today.getDate() + 1 &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
      },
      handleClick: function (index) {
        this.$emit('click', index)
      }
    },
    async created() {
      const home = await LocationService.getHomePosition();
      const distance = LocationService.getDistance({lon: this.lon, lat: this.lat}, {lon: home.lon, lat: home.lat});

      if (distance < 1) {
        this.distance = (distance * 1000).toFixed() + 'm'
      } else {
        this.distance = distance.toFixed(1) + 'km'
      }

    }
  };
</script>

<style scoped lang="scss">
  @import "../assets/variables";
  @import "../assets/mixins";

  li {
    @include textBody;
    background: $button-col-primary;
    padding: 20px;
    border-radius: 25px;
    color: $font-col-secondary;
    position: relative;
    flex: 0 0 250px;
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    cursor: pointer;

    .number {
      position: absolute;
      top: 10px;
      right: 10px;
      margin: 0;

      background: $white;
      border-radius: 9999px;
      height: $map-marker-size * 0.9;
      width: $map-marker-size * 0.9;
      display: -webkit-box;
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      -webkit-box-pack: center;
      justify-content: center;
      @include textTitle;
      letter-spacing: 0;
      font-size: 14px;
      color: $petroleum;
    }

    .title {
      font-size: 18px;
      font-weight: normal;
      margin: 0 0 5px;
    }

    .description {
      font-size: 12px;
      margin: 0 0 15px;
    }

    .meta {
      font-size: 12px;
      margin: 0;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }
</style>