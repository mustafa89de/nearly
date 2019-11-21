<template>
  <article>
    <header>
      <h1>Mein Profil</h1>
      <h1 id="menu">...</h1>
    </header>
    <user-details :user="user" :own="true"/>
    <h2>Teilnehmende Veranstaltungen</h2>
    <event-list id="prtEvents" :events="this.participationEvents" hideNumbers
                @click="handleEventClick"/>
  </article>
</template>

<script>
  import UserDetails from '../components/UserDetail';
  import EventList from '../components/HorizontalEventList';
  import AuthService from "../services/AuthService";
  import UserService from "../services/UserService";
  import EventService from "../services/EventService";

  export default {
    name: "MyProfilePage",

    components: {
      'user-details': UserDetails,
      'event-list': EventList
    },

    data() {
      return {
        user: null,
        participationEvents: null
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
          console.log(this.participationEvents)
        } catch (err) {
          console.error(err);
        }
      },
      handleEventClick: function (index) {
        this.$router.push('/event/' + this.participationEvents[index].id);
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
    padding-bottom: 30px;
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

  h2 {
    @include textTitle;
    margin: 50px 0 0 25px;
  }

  #menu {
    color: $font-col-active;
    font-size: large;
  }

  #prtEvents {
    padding: 15px 0 0 25px;
  }

</style>