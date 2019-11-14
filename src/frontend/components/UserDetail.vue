<template>
  <section>
    <h2>{{ user.username }}</h2>
    <p>{{ user.description }}</p>
    <h3>Events von {{this.user.username}}</h3>
    <event-list class="list" v-if="user" hideNumbers :events="formattedEvents" @click="handleEventClick"/>
  </section>
</template>

<script>
  import HorizontalEventList from "../components/HorizontalEventList";

  export default {
    props:{
      user: null
    },
    components: {
      "event-list": HorizontalEventList
    },
    computed: {
      formattedEvents: function(){
        return this.user.hostedEvents.map(event => ({
          title: event.name,
          description: event.description,
          lat: event.latitude,
          lon: event.longitude,
          time: event.time
        }));
      }
    },
    methods: {
      handleEventClick: function(index){
        this.$router.push('/event/' + this.user.hostedEvents[index].id);
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../assets/variables";
  @import "../assets/mixins";
  section {
    color: $font-col-primary;

    h2 {
      @include textBodyTitle;
      margin: 25px;
    }

    h3 {
      @include textTitle;
      margin: 0 25px 15px;
    }

    p {
      @include textBody;
      margin: 0 25px 25px 25px;
      height: 150px;
      overflow: auto;
    }

    .list{
      padding: 0 0 0 25px;
    }
  }
</style>