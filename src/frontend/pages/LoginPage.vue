<template>
  <article>
    <header>
      <logo id="logo"/>
    </header>
    <section class="card">
      <h2>Login</h2>
      <transition name="fade" mode="out-in">
      <form v-if="!loginFailed" id="login-form" @submit="handleLogin">
        <input-text class="input-text-wrapper" iconType="mail" type="email" placeholder="E-Mail" v-model="email"/>
        <input-text class="input-text-wrapper" iconType="key" type="password" hint="Deine Anmeldedaten stimmen nicht, bitte überprüfe noch mal deine Eingabe!" :showHint="wrongLoginData" placeholder="Password" v-model="password"/>
        <button-submit class="login-button" type="submit" text="Login" to="" :disabled="!password || !email"/>
        <p class="registration-text">Du hast noch keinen Account?</p>
        <router-link class="registration-link" to="/register">Registrieren</router-link>
      </form>
      <div id="result-wrapper" v-else>
          <h3>Ach herrje!</h3>
          <p>Leider ist bei der Anmeldung etwas schief gelaufen. Versuche es zu einem später Zeitpunkt noch einmal.</p>
          <icon class="result-icon" iconType="error-circle" iconColor="colorPrimary"/>
          <button-submit class="result-link" @click="backToForm" type="button" text="Zurück"/>
        </div>
      </transition>
    </section>
  </article>
</template>

<script>
  import TextInput from "../components/TextInput.vue";
  import Button from "../components/Button.vue";
  import Icon from "../components/Icon.vue";
  import Logo from "../assets/logo/nearly.svg";
  import AuthService from "../services/AuthService";
  import PushService from "../services/PushService";

  export default {
    data: function () {
      return {
        email: '',
        password: '',
        wrongLoginData: false,
        loginFailed: false
      };
    },
    components: {
      "input-text": TextInput,
      "button-submit": Button,
      "icon": Icon,
      "logo": Logo
    },
    methods: {
      handleLogin: async function (e) {
        e.preventDefault();

        try {
          await AuthService.login(this.email, this.password);
          await PushService.subscribeToPush();

          this.$router.push('/');
        } catch (err) {
          if (err.status === 401) {
            this.wrongLoginData = true;
          } else {
            this.loginFailed = true;
          }
        }
      },
      backToForm: function() {
        this.loginFailed = false;
      },
    },
    watch: {
      email: function(){
        this.wrongLoginData = false;
      },
      password: function(){
        this.wrongLoginData = false;
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../assets/variables";
  @import "../assets/mixins";
  @import "../assets/transitions";

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

      #logo{
        width: 50%;
      }
    }

    .card {
      flex: 1 1 auto;

      display: flex;
      flex-direction: column;
      background-color: $white;
      color: $black;
      border-radius: 50px 50px 0px 0px;
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
        position: relative;

        &:last-of-type {
          margin-bottom: 50px;
        }
      }

      #login-form {
        flex: 1;

        display: flex;
        flex-flow: column;
        height: 100%;

        .login-button, .registration-text, .registration-link {
          align-self: center;
        }

        .login-button {
          margin-top: auto;
        }

        .registration-text {
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
            color: $petroleum;
          }
        }
      }

      #result-wrapper {
        flex: 1;
        @include textBody;
        display: flex;
        flex-direction: column;

        h3 {
          @include textBodyTitle;
          margin: 25px 0 10px 0;
        }

        p {
          margin: 0;
        }

        .result-icon {
          margin: auto;
          width: 50%;
          max-width: 180px;
          height: auto;
        }

        .result-link {
          margin: auto auto 0 auto;
        }
      }
    }
  }
</style>