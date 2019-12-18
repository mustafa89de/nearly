<template>
  <main :class="{'loggedIn' : loggedIn}">
    <router-view/>
    <nav-bar :state="state" v-if="loggedIn"/>
    <pwa-notification/>
  </main>
</template>

<script>
  import NavBar from "./components/NavBar";
  import OfflineModal from "./components/OfflineModal";
  import PWANotification from "./components/PWANotification";
  import AuthService from "./services/AuthService";

  export default {
    components: {
      'nav-bar': NavBar,
      'pwa-notification': PWANotification
    },
    data: function () {
      return {
        loggedIn: AuthService.isAuthenticated(),
        state: "overview"
      }
    },
    updated() {
      const isAuthenticated = AuthService.isAuthenticated();
      if (isAuthenticated !== this.loggedIn) {
        this.loggedIn = isAuthenticated
      }
    },
    methods: {
      syncNavBarState(path) {
        if (path === "/") this.state = "overview";
        else if (path === "/event/create") this.state = "create";
        else if (path === "/me") this.state = "me";
        else this.state = "overview";
      }
    },
    watch: {
      $route(to, from) {
        this.syncNavBarState(to.path);
      }
    },
    created() {
      this.syncNavBarState(this.$route.path);
      window.addEventListener('offline', (e) => this.$router.push('/offline'))
    }
  }
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

    background-color: $bg-col-secondary;
  }

  main {
    flex: 1;
    width: 100%;
    max-width: 500px;

    display: flex;
    flex-direction: column;
  }

  main.loggedIn > article {
    margin-bottom: $nav-height;
  }

  input {
    -webkit-appearance: none;
  }

  textarea {
    border-radius: 0;
  }

  article {
    position: relative;
    flex: 1;
  }
</style>