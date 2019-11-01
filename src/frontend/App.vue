<template>
  <main>
    <router-view/>
    <footer v-if="loggedIn">
      <button @click="handleLogout">Logout</button>
    </footer>
  </main>
</template>

<script>
  import AuthService from "./services/AuthService";

  export default {
    methods: {
      handleLogout: function () {
        AuthService.logout();
      }
    },
    data: function () {
      return {
        loggedIn: AuthService.isAuthenticated()
      }
    },
    updated: function () {
      const newLoggedIn = AuthService.isAuthenticated();
      if (newLoggedIn !== this.loggedIn) {
        this.loggedIn = newLoggedIn;
      }
    }
  };
</script>

<style lang="scss">
  @import url(https://fonts.googleapis.com/css?family=Arimo|DM+Serif+Display|Poppins:700&display=swap);
  @import "./assets/variables";

  * {
    font-family: sans-serif;
    box-sizing: border-box;
  }

  html {
    height: 100%;
  }

  body {
    margin: 0;
    min-height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;

    &.red {
      background-color: $bg-col-secondary;
    }
  }

  main {
    flex: 1;
    width: 100%;
    max-width: 500px;

    display: flex;
    flex-direction: column;
  }
</style>