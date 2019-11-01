<template>
  <article>
    <h1>Secured Homepage</h1>
    <h1>Hello {{username}}!</h1>
    <router-link to="/event/create">Create Event</router-link>
  </article>
</template>
<script>
  import AuthService from "../services/AuthService";

  export default {
    computed: {
      username: function () {
        return AuthService.getUser().username;
      }
    }
  };
</script>

<style scoped lang="scss">

</style>