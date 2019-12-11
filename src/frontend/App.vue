<template>
  <main :class="{'loggedIn' : loggedIn}">
    <router-view/>
    <nav-bar :state="state" v-if="loggedIn"/>
  </main>
</template>

<script>
  import NavBar from "./components/NavBar";
  import AuthService from "./services/AuthService";

  export default {
    components: {
      'nav-bar': NavBar
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
        if(to.path === "/user/" + AuthService.getUser().userId){
          this.$router.push("/me");
        }
        this.syncNavBarState(to.path);
      }
    },
    created() {
      this.syncNavBarState(this.$route.path);
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

    &.colored {
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

  main.loggedIn > article {
    margin-bottom: $nav-height;
  }

  input {
    -webkit-appearance: none;
  }

  textarea {
    border-radius: 0;
  }
</style>