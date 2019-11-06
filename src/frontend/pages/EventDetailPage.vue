<template>
  <div>
    <div v-if="isLoading" class="eventLoading"> Loading...</div>
    <div v-if="error" class="error">{{error}}</div>
    <div v-if="event" class="eventContent">
      <article>
        <h1>{{event.name}}</h1>
        <!-- Share Button to be implemented here -->
        <p class="description">{{ event.description }}</p>
        <div class="fieldContainer">
          <div class="leftSide">
            <text-field :iconType="'longitude'" :iconColor="'primary'" :value="event.longitude.$numberDecimal"/>
            <text-field :iconType="'calendar'" :iconColor="'primary'" :value="event.date"/>
          </div>
          <div class="rightSide">
            <text-field :iconType="'latitude'" :iconColor="'primary'" :value="event.latitude.$numberDecimal"/>
            <text-field :iconType="'clock'" :iconColor="'primary'" :value="event.time"/>
          </div>
        </div>
        <text-field :iconType="'person'" :iconColor="'primary'" :value="hostName"/>
        <button-submit v-if="isCreator" @click="editEvent" class="joinButton" type="submit" text="bearbeiten"/>
        <button-submit v-else @click="signInForEvent" class="joinButton" type="submit" text="mitmachen"/>
      </article>
    </div>
    <div class="mapContainer">
      <map-comp v-if="event" :initialCenter="mapcenter" :initialZoom="12" :markers="markers"/>
    </div>
  </div>
</template>

<script>
  import EventService from "../services/EventService";
  import TextField from "../components/TextField";
  import Button from "../components/Button.vue";
  import Map from "../components/Map.vue";

  import UserService from "../services/UserService";
  import AuthService from "../services/AuthService";

  export default {
    components: {
      'text-field': TextField,
      'button-submit': Button,
      'map-comp': Map
    },

    data() {
      return {
        isLoading: false,
        error: null,
        event: null
      }
    },

    computed: {
      mapcenter: function(){
        if(this.event) return {longitude: this.event.longitude.$numberDecimal, latitude: this.event.latitude.$numberDecimal};
        else return {};
      },

      markers: function () {
        if(this.event) return [this.event.longitude.$numberDecimal, this.event.latitude.$numberDecimal];
        else return [];
      },

      hostName: async function () {
        try {
          if(this.event){
            const user = await UserService.getUserByID(this.event.hostId);
            return user.username;
          }else{
            return "Unbekannter Nutzer"
          }
        } catch (err) {
          console.error(err);
        }
      },

      isCreator: function () {
        if(this.event){
          const thisUserId = AuthService.getUser().userId;
          return thisUserId === this.event.hostId;
        }else{
          return false;
        }
      }
    },

    methods: {
      async init() {
        try {
          this.isLoading = true;
          const event = await EventService.getEventById(this.$route.params.eid);
          this.event = event;
          this.isLoading = false;
        } catch (err) {
          this.isLoading = false;
          if (err.status === 404) {
            this.error = "Das gesuchte Event existiert leider nicht.";
          } else this.error = "Ooops, das Event konnte leider nicht geladen werden ";
          console.error(err);
        }
      },

      async editEvent(e) {
        e.preventDefault();
        try {
          // TODO: Routing to Event Editing Page to be implemented here
          await this.$router.push('/');
        } catch (err) {
          console.error(err);
        }
      },

      async signInForEvent(e) {
        e.preventDefault();
        try {
          // TODO: Routing to Event Signing to be implemented here
          await this.$router.push('/');
        } catch (err) {
          console.error(err);
        }
      }
    },

    mounted() {
      this.init()
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/variables";
  @import "../assets/mixins";
  
  .eventContent {
    position: relative;
    padding: 25px;
    background: $bg-col-primary;
    border-bottom-right-radius: 5em;
    border-bottom-left-radius: 5em;
    z-index: 2;
  }
  
  article {
    flex: 1;
    display: flex;
    flex-flow: column;
  }
  
  h1 {
    font-family: Poppins, sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    margin: 0;
  }
  
  p.description {
    color: $font-col-primary;
    
    font-size: 18px;
    font-family: Arimo, sans-serif;
    line-height: 21px;
    align-items: flex-end;
    letter-spacing: 0.02em;
    
    transition: 500ms ease;
  }
  
  .fieldContainer {
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: center;
  }
  
  .joinButton {
    margin-top: 40px;
    align-self: center;
  }
  
  .mapContainer {
    position: absolute;
    background: #E44021;
    top: 250px;
    margin-left: 25px;
    width: 450px;
    height: 100vh;
    z-index: 1;
  }
  
  #map {
    position: absolute;
  }
</style>