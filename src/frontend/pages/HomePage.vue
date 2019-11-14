<template>
  <article>
    <h1>Secured Homepage</h1>
    <h1>Hello {{username}}!</h1>
    <button @click="handleLogout">Logout</button>
  </article>
</template>
<script>
  import AuthService from "../services/AuthService";

  export default {
    computed: {
      username: function () {
        return AuthService.getUser().username;
      }
    },
    methods: {
      handleLogout: function () {
        AuthService.logout();
      }
    },
  };
</script>

<style scoped lang="scss">
</style>