<template>
  <article @click="this.hideSlider">
    <header>
      <h1>Mein Profil</h1>
      <a href="#" @click="toggleSlider"><icon class="menu" iconType="menu" iconColor="primary"/></a>
    </header>
    <user-details :user="user" own/>
    <h3>Teilnehmende Veranstaltungen</h3>
    <event-list :events="this.participationEvents" hideNumbers
                @click="handleEventClick"/>
    <section class="notification">
      <h3>Benachrichtigung</h3>
      <toggle @onToggle="notificationToggle" :checked="notificationSubscribed"/>
    </section>
    <h3>Meine Home Position</h3>
    <location-picker @save="handleHomePositionChange" show-home-position show-radius :propRadius="user ? user.radius : null"/>
    <p v-if="errorMsg" id="error">{{errorMsg}}</p>
    <slide-menu :username="user ? user.username : null" :sliderVisible="sliderVisible"/>
  </article>
</template>

<script>
  import UserDetails from '../components/UserDetail';
  import EventList from '../components/HorizontalEventList';
  import AuthService from "../services/AuthService";
  import UserService from "../services/UserService";
  import EventService from "../services/EventService";
  import PushService from "../services/PushService";
  import Icon from "../components/Icon";
  import SlideMenu from "../components/SlideMenu";
  import LocationPicker from "../components/LocationPicker";
  import Toggle from "../components/Toggle";
  import { INITIAL_MAP_RADIUS } from "../constants";

  export default {
    name: "MyProfilePage",

    components: {
      "user-details": UserDetails,
      "event-list": EventList,
      "icon": Icon,
      "slide-menu": SlideMenu,
      "location-picker": LocationPicker,
      "toggle": Toggle
    },

    data() {
      return {
        user: null,
        participationEvents: null,
        sliderVisible: false,
        errorMsg: null,
        notificationSubscribed: false
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

          this.notificationSubscribed = await PushService.hasSubscribed();

        } catch (err) {
          console.error(err);
        }
      },
      handleEventClick: function (index) {
        this.$router.push('/event/' + this.participationEvents[index].id);
      },
      toggleSlider: function(e){
        this.sliderVisible = !this.sliderVisible;
      },
      hideSlider: function(e){
        if(e.target.classList.contains("background")){
          this.sliderVisible = !this.sliderVisible;
        }
      },
      async handleHomePositionChange(newData) {
        try {
          await UserService.setHomePosition({ lon: newData.lon, lat: newData.lat });
          await UserService.setRadius(newData.radius);
          this.$router.go();
          this.errorMsg = null;
        } catch (e) {
          this.errorMsg = "Es ist ein Fehler beim setzen der Home Position aufgetreten."
        }
      },
      async notificationToggle(e){
        try {
          if(e){
            const subscriptionSuccess = await PushService.subscribeToPush();
            if (subscriptionSuccess) {
              this.notificationSubscribed = true;
            } else {
              this.notificationSubscribed = false;
            }
          }
          else{
            await PushService.unsubscribePush();
            this.notificationSubscribed = false;
          }
        } catch(e) {
          console.error("couldn't subscribe to notifications");
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
    align-items: center;
    margin: 0 25px 0 25px;

    h1 {
      @include textTitle;
      color: $font-col-primary;
      margin: 0;
      padding: 0;
    }

    .menu {
      height: 32px;
      width: 32px;
    }
  }

  .notification {
    margin-top: 50px;
    padding: 0 25px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h3 {
      @include textTitle;
      margin: 0;
    }
  }

  h3 {
    @include textTitle;
    margin: 50px 25px 25px;
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