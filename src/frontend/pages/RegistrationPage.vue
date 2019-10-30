<template>
  <article>
    <header>
      <h1>Meeting</h1>
    </header>
    <transition name="slide">
      <section v-if="isReady" class="card">
        <h2>Registrierung</h2>
        <form @submit="handleRegistration">
          <input-text class="input-text-wrapper" iconType="person" placeholder="Benutzername" v-model="username"/>
          <input-text class="input-text-wrapper" iconType="mail" placeholder="E-Mail" v-model="email"/>
          <input-text class="input-text-wrapper" iconType="key" type="password" placeholder="Password" v-model="password"/>
          <p v-if="errorMessage">{{errorMessage}}</p>
          <p v-if="registrationSucceed">Die Registrierung war erfolgreich</p>
          <button-submit class="register-button" type="submit" text="Registrieren" :disabled="!password || !username || !email"/>
          <p class="login-text">Du hast schon einen Account?</p>
          <router-link class="login-link" to="/login">Anmelden</router-link>
        </form>
      </section>
    </transition>
  </article>
</template>

<script>
  import TextInput from "../components/TextInput.vue";
  import Button from "../components/Button.vue";
  import UserService from "../services/UserService";

  export default {
    data: function () {
      return {
        isReady: false,
        username: '',
        email: '',
        password: '',
        errorMessage: null,
        registrationSucceed: false
      };
    },
    components: {
      "input-text": TextInput,
      "button-submit": Button
    },
    methods: {
      handleRegistration: async function (e) {
        e.preventDefault();

        try {
          await UserService.register(this.username, this.email, this.password);

          this.registrationSucceed = true;
          this.errorMessage = null;
        } catch (err) {
          this.registrationSucceed = false;

          if (err.status === 409) {
            this.errorMessage = "Es existiert bereits ein Nutzer mit dieser E-Mail-Adresse";
          } else {
            this.errorMessage = "Ein unbekannter Fehler ist aufgetreten."
          }
        }
      },
    },
    mounted() {
      this.isReady = true;
    }
  };
</script>

<style lang="scss">
  @import "assets/variables";
  @import "assets/mixins";

  body {
    background-color: $colorPrimary;
  }

  article {
    flex: 1;

    display: flex;
    flex-flow: column;

    header {
      flex: 1 1 auto;
      padding: 25px;
      max-height: 200px;
      display: flex;
      align-items: center;

      h1 {
        margin: 0;
        color: $colorWhite;
        font-family: "DM Serif Display", "Times New Roman", Times, serif;
        font-size: 2rem;
      }
    }

    .card {
      flex: 1 1 auto;

      display: flex;
      flex-direction: column;
      background-color: $colorWhite;
      border-radius: 50px 50px 0px 0px;
      padding: 50px 25px 50px 25px;
      box-shadow: $shadowDark;

      h2 {
        flex: none;
        @include textTitle;
        color: $colorBlack;
        margin: 0;
      }

      .input-text-wrapper {
        margin-top: 50px;
        position: relative;

        &:last-of-type {
          margin-bottom: 50px;
        }        
      }

      form {
        flex: 1;

        display: flex;
        flex-flow: column;
        height: 100%;
        padding-bottom: 25px;
      }

      .register-button, .login-text, .login-link {
        align-self: center;
      }

      .register-button {
        margin-top: auto;
      }

      .login-text {
        @include textBody;
        color: $colorBlackLight;
        margin: 25px 0 10px 0;
      }

      .login-link {
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

  //vue transitions
  .slide-enter-active, .slide-leave-active {
    transition: opacity 500ms ease-out, transform 500ms ease-out;
  }

  .slide-enter, .slide-leave-to {
    transform: translateY(200px);
    opacity: 0;
  }
</style>