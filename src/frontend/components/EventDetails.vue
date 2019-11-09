<template>
  <article>
    <h1>{{event.name}}</h1>
    <!-- TODO: Implement share Button -->
    <p class="description">{{ event.description }}</p>
    <div class="fieldContainer">
      <text-field class="detailField" :iconType="'longitude'" :iconColor="'primary'" :value="event.loc.coordinates[0]"/>
      <text-field class="detailField" :iconType="'latitude'" :iconColor="'primary'" :value="event.loc.coordinates[1]"/>
      <text-field class="detailField" :iconType="'calendar'" :iconColor="'primary'" :value="eventDate"/>
      <text-field class="detailField" :iconType="'clock'" :iconColor="'primary'" :value="eventTime"/>
    </div>
    <text-field :iconType="'person'" :iconColor="'primary'" :value="hostName"/>
    <button-submit v-if="isCreator" @click="editEvent" class="joinButton" type="submit" text="bearbeiten"/>
    <button-submit v-else @click="signInForEvent" class="joinButton" type="submit" text="mitmachen"/>
  </article>
</template>

<script>
  import AuthService from "../services/AuthService";
  import UserService from "../services/UserService";
  import TextField from "../components/TextField";
  import Button from "../components/Button.vue";
  
  export default {
    name: "EventDetails",
    components:{
      'text-field': TextField,
      'button-submit': Button
    },
    
    props: {
      event: Object,
    },
    
    data(){
      return {
        hostName: undefined
      };
    },
    
    computed: {
      isCreator: function () {
        if(this.event){
          const thisUserId = AuthService.getUser().userId;
          return thisUserId === this.event.hostId;
        }else{
          return false;
        }
      },
      
      eventDate: function(){
        return new Date(this.event.time).toLocaleDateString();
      },
      
      eventTime: function(){
        return new Date(this.event.time).toLocaleTimeString('de-De', {timeStyle: 'short'});
      }
    },
    
    methods: {
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
      },

      async getHostName() {
        try{
          this.hostName = await UserService.getUserByID(this.event.hostId);
        }catch(err){
          console.error(err);
          this.hostName = this.event.hostId;
        }
      },
    },
    
    async created() {
      await this.getHostName();
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/variables";
  @import "../assets/mixins";
  
  article {
    flex: 1;
    display: flex;
    flex-flow: column;
    background-color: $bg-col-primary;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    border-radius: 0px 0px 50px 50px;
    padding: 5%;
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
    letter-spacing: 0.02em;
  }
  
  .fieldContainer {
    flex: 1;
    display: flex;
    flex-flow: row wrap;
  }
  
  .detailField{
    min-width: 50%;
  }
  
  .joinButton {
    margin-top: 5%;
    align-self: center;
  }
</style>