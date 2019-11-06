<template>
  <div>
    <div v-if="isLoading" class="eventLoading"> Loading...</div>
    <div v-if="error" class="error"> {{error}}</div>
    <div v-if="event" class="eventContent">
      <article>
        <h1> {{name}} </h1>
        <!-- Share Button to be implemented here -->
        <p class="description">{{ description }}</p>
        <div class="fieldContainer">
          <div class="leftSide">
            <text-field :iconType="'longitude'" :iconColor="'primary'" :value="longitude"/>
            <text-field :iconType="'calendar'" :iconColor="'primary'" :value="eventDate"/>
          </div>
          <div class="rightSide">
            <text-field :iconType="'latitude'" :iconColor="'primary'" :value="latitude"/>
            <text-field :iconType="'clock'" :iconColor="'primary'" :value="time"/>
          </div>
        </div>
        <text-field :iconType="'person'" :iconColor="'primary'" :value="hostID"/>
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
        event: null,
        name: null,
        description: null,
        latitude: null,
        longitude: null,
        mapcenter: null,
        markers: null,
        time: null,
        eventDate: null,
        hostID: null,
        isCreator: null,
      }
    },

    created() {
      // fetch event when Vue is created
      this.init()
    },

    methods: {
      async init() {
        try {
          this.isLoading = true;

          // fetch Event
          const event = await EventService.getEventById(this.$route.params.eid);
          this.setEventData(event);
          this.adaptButton();

          // hostId to be replaced by user name after endpoint is available
          // this.hostID = UserService.getUserByID(event.hostId);
          this.isLoading = false;

        } catch (err) {
          this.isLoading = false;
          if (err.status === 404) {
            this.error = "Das gesuchte Event existiert leider nicht.";
          } else this.error = "Ooops, das Event konnte leider nicht geladen werden ";
          console.error(err);
        }
      },

      setEventData(event) {
        this.event = event;
        this.name = event.name;
        this.description = event.description;
        this.latitude = event.latitude.$numberDecimal;
        this.longitude = event.longitude.$numberDecimal;
        this.mapcenter = {longitude: this.longitude, latitude: this.latitude};
        this.markers = [this.longitude, this.latitude];
        
        const eventTime = new Date(event.time);
        this.time = eventTime.getHours() + ':' + eventTime.getMinutes();  // to be replaced after aligning with be
        this.eventDate = event.date;
        this.hostID = event.hostId;
      },

      adaptButton() {
        if (AuthService.getUser().userId === this.hostID) this.isCreator = true;
        else this.isCreator = false;
      },

      async editEvent(e) {
        e.preventDefault();
        try {
          // Routing to Event Editing Page to be implemented here
          await this.$router.push('/');
        } catch (err) {
          console.error(err);
        }
      },

      async signInForEvent(e) {
        e.preventDefault();
        try {
          // Routing to Event Signing to be implemented here
          await this.$router.push('/');
        } catch (err) {
          console.error(err);
        }
      }
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

  .mapContainer{
    position:absolute;
    background: #E44021;
    top: 250px;
    margin-left: 25px;
    width: 450px;
    height: 100vh;
    z-index: 1;
  }
  
  #map{
    position:absolute;
  }
</style>