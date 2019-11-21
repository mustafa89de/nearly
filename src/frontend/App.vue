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
    watch: {
      $route(to, from){
        if(to.path === "/") this.state = "overview";
        else if(to.path === "/event/create") this.state = "create";
        else if(to.path === "/me") this.state = "me";
        else this.state = "overview";
      }
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