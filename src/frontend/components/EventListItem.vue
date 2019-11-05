<template>
  <li class="eventListItem" @click="handleClick">
    <p class="number">{{number}}</p>
    <h4 class="title">{{title}}</h4>
    <p class="description">{{description}}</p>
    <p class="meta">
      <span>{{formattedDate}}</span>
      <span>{{distance}}</span>
    </p>
  </li>
</template>

<script>
  export default {
    props: {
      number: Number,
      title: String,
      description: String,
      distance: String,
      time: String
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
    }
  };
</script>

<style scoped lang="scss">
  @import "../assets/variables";

  li {
    font-family: Arimo, sans-serif;
    letter-spacing: 0.02em;
    background: $button-col-secondary;
    padding: 20px;
    border-radius: 25px;
    color: #fff;
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
      height: 28px;
      width: 28px;
      display: -webkit-box;
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      -webkit-box-pack: center;
      justify-content: center;
      font-family: "Poppins", Arial, Helvetica, sans-serif;
      color: $red;
      font-size: 14px;
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
      margin: 0;
      font-size: 12px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }
</style>