<template>
  <article>
    <header>
      <h1>Mein Profil</h1>
    </header>
    <user-details :user="user" own/>
    <h3>Teilnehmende Veranstaltungen</h3>
    <event-list :events="this.participationEvents" hideNumbers @click="handleEventClick"/>
    <section class="notification">
      <h3>Benachrichtigung</h3>
      <toggle @onToggle="notificationToggle" :checked="notificationSubscribed"/>
    </section>
    <h3>Meine Home Position</h3>
    <location-picker @save="handleHomePositionChange" show-home-position show-radius :propRadius="user ? user.radius : null"/>
    <custom-button
      class="button"
      type="link"
      to="/me/edit"
      text="Bearbeiten"
    />
    <custom-button
      class="button"
      type="button"
      text="Abmelden"
      @click="handleLogout"
      bordered
    />
    <p v-if="errorMsg" id="error">{{errorMsg}}</p>
  </article>
</template>

<script>
  import UserDetails from '../components/UserDetail';
  import EventList from '../components/HorizontalEventList';
  import AuthService from "../services/AuthService";
  import UserService from "../services/UserService";
  import EventService from "../services/EventService";
  import PushService from "../services/PushService";
  import LocationPicker from "../components/LocationPicker";
  import Toggle from "../components/Toggle";
  import Button from "../components/Button";

  export default {
    name: "MyProfilePage",
    components: {
      "user-details": UserDetails,
      "event-list": EventList,
      "location-picker": LocationPicker,
      "toggle": Toggle,
      "custom-button": Button
    },
    data() {
      return {
        user: null,
        participationEvents: null,
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
          this.notificationSubscribed = await PushService.syncSubscription();
        } catch (err) {
          console.error(err);
        }
      },
      handleEventClick: function (index) {
        this.$router.push('/event/' + this.participationEvents[index].id);
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
            await PushService.unsubscribePush(false);
            this.notificationSubscribed = false;
          }
        } catch(e) {
          console.error("couldn't subscribe to notifications");
          this.notificationSubscribed = false;
        }
      },
      handleLogout: async function () {
       await AuthService.logout();
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
    display: flex;
    flex-direction: column;
    @include pageCard;

    .picker {
      margin: 0 25px 50px;
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

    .button {
      align-self: center;
      margin-bottom: 25px;
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
  }
</style>