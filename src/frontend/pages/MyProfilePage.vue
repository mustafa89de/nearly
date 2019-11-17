<template>
  <article>
    <header>
      <h1>Mein Profil</h1>
      <h1 id="menu">...</h1>
    </header>
    <user-details v-if="user" :user="user"/>
    <h2>Events an denen {{user.username}} teilnimmt</h2>
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

          // const prtEvents = await EventService.getEventsByUserId(jwtUser);
          const prtEvents = true;
          
          if(prtEvents){
            this.participationEvents = this.user.hostedEvents.map((event) => {
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

<style scoped lang="scss">
  @import "../assets/variables";
  @import "../assets/mixins";
  
  article{
    background: $bg-col-primary;
    margin-top: 25px;
    padding: 25px 25px 0 0;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
  }
  
  header{
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }

  h1{
    @include textTitle;
    color: $font-col-primary;
    margin: 0 0 0 25px;
  }
  
  h2{
    @include textTitle;
    margin: 25px 0 0 25px;
  }

  #menu{
    color: $font-col-active;
    font-size: x-large;
    padding: 0;
  }
  
  #prtEvents{
    padding: 15px 0 0 25px;
  }
  
</style>