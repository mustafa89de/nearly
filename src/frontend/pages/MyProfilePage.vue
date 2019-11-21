<template>
  <article>
    <header>
      <h1>Mein Profil</h1>
      <h1 id="menu">...</h1>
    </header>
    <user-details :user="user" :own="true"/>
    <h3>Teilnehmende Veranstaltungen</h3>
    <event-list :events="this.participationEvents" hideNumbers
                @click="handleEventClick"/>
    <h3>Meine Home Position</h3>
    <location-picker @save="handleHomePositionChange"/>
    <p v-if="errorMsg" id="error">{{errorMsg}}</p>
  </article>
</template>

<script>
  import UserDetails from '../components/UserDetail';
  import EventList from '../components/HorizontalEventList';
  import AuthService from "../services/AuthService";
  import UserService from "../services/UserService";
  import EventService from "../services/EventService";
  import LocationPicker from "../components/LocationPicker";

  export default {
    name: "MyProfilePage",

    components: {
      'user-details': UserDetails,
      'event-list': EventList,
      'location-picker': LocationPicker
    },

    data() {
      return {
        user: null,
        participationEvents: null,
        errorMsg: null
      }
    },

    methods: {
      async init() {

        const jwtUser = AuthService.getUser(); // does not contain hostedEvents

        try {

          this.user = await UserService.getUserByID(jwtUser.userId);

          const participationEvents = await EventService.getEventsByUserId(jwtUser.userId);
          this.participationEvents = participationEvents.map(({name, latitude, longitude, ...e}) => ({
            title: name,
            lat: latitude,
            lon: longitude,
            ...e
          }));
        } catch (err) {
          console.error(err);
        }
      },
      handleEventClick: function (index) {
        this.$router.push('/event/' + this.participationEvents[index].id);
      },
      async handleHomePositionChange(newPosition) {
        try {
          await UserService.setHomePosition(newPosition);
          this.$router.go();
          this.errorMsg = null;
          throw new Error();
        } catch (e) {
          this.errorMsg = "Es ist ein Fehler beim setzen der Home Position aufgetreten."
        }
      }
    },

    created() {
      this.init();
    }

  }
</script>

<style scoped lang="scss">
  @import "../assets/variables";
  @import "../assets/mixins";

  article {
    @include pageCard;

    .picker {
      margin: 25px 25px 35px;
    }
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin: 0 25px 0 25px;
  }

  h1 {
    @include textTitle;
    color: $font-col-primary;
    margin: 0;
    padding: 0;
  }

  h3 {
    @include textTitle;
    margin: 50px 25px 25px;
  }

  #menu {
    color: $font-col-active;
    font-size: large;
  }

  .horizontalEventList {
    padding: 0 0 0 25px;
  }

  #error {
    color: $font-col-error;
    font-weight: bold;
    margin: -20px 25px 35px;
    letter-spacing: 0.2px;
  }
</style>