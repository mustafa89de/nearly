<template>
  <article>
    <header>
      <h1>Meeting</h1>
    </header>
    <transition name="slide">
      <div v-if="isReady" class="card">
        <h2>Registrierung</h2>
        <form>
          <div class="top-wrapper">                        
              <input-text class="input-text-wrapper" iconType="person" placeholder="Benutzername" />            
              <input-text class="input-text-wrapper" iconType="mail" placeholder="E-Mail" />            
              <input-text class="input-text-wrapper" iconType="key" type="password" placeholder="Password" />            
          </div>
          <div class="bottom-wrapper">
            <button-submit type="submit" text="Registrieren" :onClick="register" />
            <p class="login-text">Du hast schon einen Account?</p>
            <a href="#" @click="login">Anmelden</a>
          </div>
        </form>
      </div>
    </transition>
  </article>
</template>

<script>
  import TextInput from "../components/TextInput.vue";
  import Button from "../components/Button.vue";

  export default {
    data: function() {
      return {
        isReady: false
      };
    },
    components: {
      "input-text": TextInput,
      "button-submit": Button
    },
    methods: {
      register: function() {
        alert("register");
      },
      login: function() {
        alert("login");        
      }
    },
    mounted(){
      this.isReady = true;
    }
  };
</script>

<style lang="scss">
  @import "assets/variables";
  @import "assets/mixins";

  body {
    background-color: $colorPrimary;
    overflow: hidden;
  }  

  article {
    display: flex;
    flex-flow: column;
    height: 100%;

    header {
      flex: 0 1 auto;
      padding: 50px 25px 50px 25px;

      h1 {
        color: $colorWhite;
        font-family: "DM Serif Display", "Times New Roman", Times, serif;
        font-size: 2rem;
      }
    }

    .card {
      flex: 1 1 auto;
      background-color: $colorWhite;
      border-radius: 50px 50px 0px 0px;
      padding: 50px 25px 50px 25px;
      box-shadow: $shadowDark;      

      h2 {
        @include textTitle;
        color: $colorBlack;
        margin: 0;
      }

      .input-text-wrapper {
        margin-top: 50px;
      }

      form {
        display: flex;
        flex-flow: column;
        height: 100%;
        padding-bottom: 25px;
      }

      .top-wrapper {
        flex: 1 1 auto;

        .input-text-wrapper{
          margin-top: 50px;
        }
      }

      .bottom-wrapper {
        flex: 0 1 auto;
        text-align: center;

        .login-text {
          @include textBody;
          color: $colorBlackLight;
          margin: 25px 0 10px 0;
        }

        a {
          @include textButton;
          text-decoration: none;
          color: $colorSecondary;
          transition: color 500ms ease;

          &:link,
          &:visited,
          &:active {
            color: $colorSecondary;
          }

          &:hover {
            color: $colorPrimary;
          }
        }
      }
    }
  }

  //vue transitions
  .slide-enter-active, .slide-leave-active {
    transition: opacity 500ms ease-out, transform 500ms ease-out;
  }

  .slide-enter, .slide-leave-to {
    transform: translateY(200px);
    opacity: 0;
  }
</style>