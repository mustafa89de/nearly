<template>
  <article>
      <user-details v-if="user" :user="user"/>
      <event-list id="prtEvents" v-if="participationEvents" :events="this.participationEvents" hideNumbers="true"/>
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
    
    data(){
      return{
        user: null,
        participationEvents: null
      }
    },
    
    methods:{
      async init(){
        
        const jwtUser = AuthService.getUser(); // does not contain hostedEvents
        
        try{
          
          this.user = await UserService.getUserByID(jwtUser.userId);

          const prtEvents = await EventService.getEventsByUserId(jwtUser);
          
          if(prtEvents){
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
          
        }catch(err){
          console.error(err);
        }
      }
    },
    
    created(){
      this.init();
    }
    
  }
</script>

<style scoped>
  #prtEvents {
    padding: 25px 0 0 25px;
  }
</style>