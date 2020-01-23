<template>
  <article>
    <header>
      <logo id="logo"/>
    </header>
    <section class="card">
      <h2>Registrierung</h2>
      <transition name="fade" mode="out-in">
        <form v-if="!resultMessage" id="registration-form" @submit="handleRegistration">
          <input-text class="input-text-wrapper" iconType="person" placeholder="Benutzername" hint="Benutzername muss mind. 4 Zeichen haben" :showHint="username !== '' && !usernameValid" v-model="username"/>
          <input-text class="input-text-wrapper" iconType="mail" placeholder="E-Mail" :hint="emailAlreadyExists ? 'Es existiert bereits ein Nutzer mit dieser E-Mail-Adresse' : 'E-Mail-Adresse ist unvollständig'" :showHint="emailAlreadyExists || (email !== '' && !emailValid)" v-model="email"/>
          <input-text class="input-text-wrapper" iconType="key" type="password" placeholder="Passwort" hint="Passwort muss mind. 8 Zeichen haben" :showHint="password !== '' && !passwordValid" v-model="password"/>
          <button-submit class="register-button" type="submit" text="Registrieren" :disabled="!usernameValid || !emailValid || !passwordValid"/>
          <p class="login-text">Du hast schon einen Account?</p>
          <router-link class="login-link" to="/login">Anmelden</router-link>
        </form>
        <div id="result-wrapper" v-else>
          <h3>{{resultTitle}}</h3>
          <p>{{resultMessage}}</p>
          <icon class="result-icon" :iconType="resultButton === 'Anmelden' ? 'check-circle' : 'error-circle'" iconColor="colorPrimary"/>
          <button-submit class="result-link" @click="backToForm" to="/login" :type="resultButton === 'Anmelden' ? 'link' : 'button'" :text="resultButton"/>
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
  import UserService from "../services/UserService";

  export default {
    data: function () {
      return {
        username: '',
        email: '',
        password: '',
        resultTitle: "",
        resultMessage: "",
        resultButton: "",
        usernameValid: false,
        emailValid: false,
        passwordValid: false,
        emailAlreadyExists: false
      };
    },
    components: {
      "input-text": TextInput,
      "button-submit": Button,
      "icon": Icon,
      "logo": Logo
    },
    methods: {
      handleRegistration: async function (e) {
        e.preventDefault();

        try {
          await UserService.register(this.username, this.email, this.password);

          this.resultTitle = "Glückwunsch!";
          this.resultMessage = "Du hast dich erfolgreich registriert. Gehe weiter zur Anmeldung.";
          this.resultButton = "Anmelden";
        } catch (err) {
          if (err.status === 409) {
            this.emailAlreadyExists = true;
          } else {
            this.resultTitle = "Ach herrje!";
            this.resultMessage = "Leider ist bei der Registrierung etwas schief gelaufen. Versuche es zu einem später Zeitpunkt noch einmal.";
            this.resultButton = "Zurück";
          }
        }
      },
      backToForm: function() {
        this.resultTitle = "";
        this.resultMessage = "";
        this.resultButton = "";
      }
    },
    watch: {
      username: function(){
        this.usernameValid = this.username.length >= 4;
      },
      email: function(){
        this.emailAlreadyExists = false;
        this.emailValid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        .test(this.email);
      },
      password: function(){
        this.passwordValid = this.password.length >= 8;
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
        position: relative;

        &:last-of-type {
          margin-bottom: 50px;
        }
      }

      #registration-form {
        flex: 1;

        display: flex;
        flex-flow: column;
        height: 100%;

        .register-button, .login-text, .login-link {
          align-self: center;
        }

        .register-button {
          margin-top: auto;
        }

        .login-text {
          @include textBody;
          color: $font-col-light;
          margin: 25px 0 10px 0;
        }

        .login-link {
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