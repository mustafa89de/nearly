<template>
  <article>
    <!-- the header might be placed in separate component on the main page to not be rendered each time -->
    <header>
      <h1>Meeting</h1>
    </header>
    <transition name="slide">
      <section v-if="isReady" class="card">
        <h2>Login</h2>
        <form @submit="handleLogin">
          <input-text class="input-text-wrapper" iconType="mail" type="email" placeholder="E-Mail" v-model="email"/>
          <input-text class="input-text-wrapper" iconType="key" type="password" placeholder="Password" v-model="password"/>
          <!-- ps are placeholders to be replaced -->
          <p v-if="errorMessage">{{errorMessage}}</p>
          <p v-if="loginSucceed">Du hast dich erfolgreich angemeldet</p>
          <button-submit class="login-button" type="submit" text="Login" :disabled="!password || !email"/>
          <p class="login-text">Du hast noch keinen Account?</p>
          <!--- We might need a separate router endpoint for registration. Currently this will lead to main landing page -->
          <router-link class="registration-link" to="/register">Registrieren</router-link>
        </form>
      </section>
    </transition>
  </article>
</template>

<script>
  import TextInput from "../components/TextInput.vue";
  import Button from "../components/Button.vue";
  import AuthService from "../services/AuthService";

  export default {
    data: function () {
      return {
        isReady: false,
        email: '',
        password: '',
        errorMessage: null,
        loginSucceed: false
      };
    },
    components: {
      "input-text": TextInput,
      "button-submit": Button
    },
    methods: {
      handleLogin: async function (e) {
        e.preventDefault();

        try {
          await AuthService.login(this.email, this.password);
          this.loginSucceed = true;
          this.errorMessage = null;
          this.$router.push('/');
        } catch (err) {
          this.loginSucceed = false;
          if (err.status === 401) {
            this.errorMessage = "Dein Passwort oder Email stimmen nicht, bitte überprüfe nochmal deine Eingabe!";
          } else {
            this.errorMessage = "Ein unbekannter Fehler ist aufgetreten."
          }
        }
      },
    },
    mounted() {
      this.isReady = true;
      document.body.classList.add('red');
    },
    destroyed() {
      document.body.classList.remove('red');
    }
  };
</script>

<style scoped lang="scss">
  @import "../assets/variables";
  @import "../assets/mixins";

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
        color: $font-col-secondary;
        font-family: "DM Serif Display", "Times New Roman", Times, serif;
        font-size: 2rem;
      }
    }

    .card {
      flex: 1 1 auto;

      display: flex;
      flex-direction: column;
      background-color: $bg-col-primary;
      border-radius: 50px 50px 0 0;
      padding: 50px 25px 50px 25px;
      box-shadow: $shadow-dark;

      h2 {
        flex: none;

        @include textTitle;
        color: $font-col-primary;
        margin: 0;
      }

      .input-text-wrapper {
        margin-top: 50px;

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

      .login-button, .login-text, .registration-link {
        align-self: center;
      }

      .login-button {
        margin-top: auto;
      }

      .login-text {
        @include textBody;
        color: $font-col-light;
        margin: 25px 0 10px 0;
      }

      .registration-link {
        @include textButton;
        text-decoration: none;
        color: $link-color;
        transition: color 500ms ease;

        &:link,
        &:visited,
        &:active {
          color: $link-color;
        }

        &:hover {
          color: $red;
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