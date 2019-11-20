<template>
  <article>
    <header>
      <h1>Mein Profil</h1>
      <h1 id="menu">...</h1>
    </header>
    <user-details v-if="user" :user="user"/>
    <h2>Events an denen {{user.username}} teilnimmt</h2>
    <event-list id="prtEvents" v-if="participationEvents" :events="this.participationEvents" hideNumbers/>
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

          const prtEvents = await EventService.getEventsByUserId(jwtUser.userId);

          if (prtEvents) {
            this.participationEvents = prtEvents.map((event) => {
              return {
                title: event.name,
                description: event.description,
                lat: event.latitude,
                lon: event.longitude,
                time: event.time
              }
            });
          }

        } catch (err) {
          console.error(err);
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
    @include pageCard
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
    margin: 15px 0 0 25px;
  }

  #menu {
    color: $font-col-active;
    font-size: large;
  }
  
  #prtEvents {
    padding: 15px 0 0 25px;
  }

</style>