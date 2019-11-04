<template>
    <div class="event">
        <div v-if="isLoading" class="eventLoading">
            Loading...
        </div>
        <div v-if="error" class="error">
            {{error}}
        </div>
        <div v-if="event" class="eventContent">
            <article>
                <header>
                    <h1>
                        {{event.name}}
                    </h1>
                </header>
            </article>
        </div>
    </div>
</template>

<script>
  import EventService from "../services/EventService";
  export default {
    data() {
      return {
        isLoading: false,
        event: null,
        error: null
      }
    },

    created() {
      // fetch event when Vue is created
      this.fetchEvent()
    },

    methods: {
      async fetchEvent() {
        try {
          this.isLoading = true;
          const event = await EventService.getEventById(this.$route.params.eid);
          this.isLoading = false;

          //Everything worked fine, page content can be modified
          this.event = event;
        }catch(err){
          this.isLoading = false;
          this.error = "Ooops, das Event konnte leider nicht geladen werden ";
          console.error(err);
        }
      }
    }
  }
</script>

<style scoped>

</style>