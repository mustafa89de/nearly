<template>
  <article>
    <h1>Profil bearbeiten</h1>
    <input-text
        class="input-text"
        iconType="person"
        placeholder="Benutzername"
        :hint="usernameAlreadyExists ? 'Es existiert bereits ein Nutzer mit diesem Namen' : 'E-Benutzername muss mind. 4 Zeichen haben'"
        :showHint="usernameAlreadyExists || (username !== '' && !usernameValid)"
        v-model="username"/>
    <input-text
        class="input-text"
        iconType="mail"
        placeholder="E-Mail"
        :hint="emailAlreadyExists ? 'Es existiert bereits ein Nutzer mit dieser E-Mail-Adresse' : 'E-Mail-Adresse ist unvollständig'"
        :showHint="emailAlreadyExists || (email !== '' && !emailValid)"
        v-model="email"/>
    <textarea
        placeholder="Beschreibung"
        v-model="description"
    />
    <p v-if="errorMsg" id="error">{{errorMsg}}</p>
    <custom-button
        class="button"
        type="button"
        text="Speichern"
        @click="handleSave"
    />
    <custom-button
        class="button"
        type="button"
        text="Abbrechen"
        @click="handleCancel"
        bordered
    />
    <custom-button
        class="button delete"
        type="button"
        text="Profil löschen"
        @click="handleDelete"
    />
    <confirmation-modal
        v-if="showDeleteModal"
        title="Löschen"
        text="Bist du dir sicher, dass du dein Profil löschen möchtest?"
        confirm-text="Löschen"
        @confirm="confirmDelete"
        @abort="abortDelete"
    />
  </article>
</template>

<script>
  import UserService from "../services/UserService";
  import AuthService from "../services/AuthService";
  import Icon from "../components/Icon";
  import Button from "../components/Button";
  import InputText from "../components/TextInput";
  import ConfirmationModal from "../components/ConfirmationModal";

  export default {
    components: {
      "confirmation-modal": ConfirmationModal,
      "icon": Icon,
      "input-text": InputText,
      "custom-button": Button
    },
    data() {
      return {
        user: null,
        username: null,
        email: null,
        description: null,
        usernameAlreadyExists: false,
        emailAlreadyExists: false,
        usernameValid: true,
        emailValid: true,
        errorMsg: null,
        showDeleteModal: false
      }
    },
    methods: {
      async init() {
        const jwtUser = AuthService.getUser();
        try {
          this.user = await UserService.getUserByID(jwtUser.userId);
          this.username = this.user.username;
          this.email = this.user.email;
          this.description = this.user.description;
        } catch (err) {
          console.error(err);
        }
      },
      async handleSave() {
        if (this.username === this.user.username
          && this.email === this.user.email
          && this.description === this.user.description) {
          await this.$router.push('/me');
        } else {
          try {
            this.usernameAlreadyExists = false;
            this.emailAlreadyExists = false;
            this.errorMsg = null;
            await UserService.updateUser({
              username: this.username,
              email: this.email,
              description: this.description
            });
            await this.$router.push('/me');
          } catch (err) {
            if (err.status === 409) {
              if (err.dupKey === "username") this.usernameAlreadyExists = true;
              if (err.dupKey === "email") this.emailAlreadyExists = true;
            } else {
              this.errorMsg = err;
            }
            console.error(err);
          }
        }
      },
      async handleCancel() {
        await this.$router.push('/me');
      },
      handleDelete() {
        this.showDeleteModal = true
      },
      async confirmDelete() {
        try {
          await UserService.deleteUser(AuthService.getUser().userId);
          await AuthService.logout(true);
        } catch (e) {
          this.errorMsg = 'Ein unbekannter Fehler ist aufgetreten.';
          this.showDeleteModal = false;
        }
      },
      abortDelete() {
        this.showDeleteModal = false
      }
    },
    watch: {
      username: function () {
        this.usernameAlreadyExists = false;
        this.usernameValid = this.username.length >= 4;
      },
      email: function () {
        this.emailAlreadyExists = false;
        this.emailValid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          .test(this.email);
      }
    },
    created() {
      this.init();
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/variables";
  @import "../assets/mixins";

  article {
    display: flex;
    flex-direction: column;
    @include pageCard;

    h1 {
      @include textTitle;
      color: $font-col-primary;
      margin: 0 25px;
      padding: 0;
    }

    .input-text {
      margin: 25px 25px;
      position: relative;

      &:last-of-type {
        margin-bottom: 50px;
      }
    }

    .input-text:first-of-type {
      margin-top: 50px;
    }

    textarea {
      background: $text-field-col;
      padding: 10px;
      margin: 0 25px auto 25px;
      color: $font-col-light;

      border: 0;
      border-bottom: 1px solid $light-black;
      outline: 0;
      height: 120px;
      font-size: 18px;

      @include textBody;
      line-height: 21px;
      display: flex;
      align-items: flex-end;
      resize: none;

      transition: 500ms ease;

      &::placeholder {
        color: $placeholder-col;
        transition: color 500ms ease;
      }

      &:focus {
        border-color: $font-col-active;
        color: $font-col-active;

        &::placeholder {
          color: $placeholder-col-active;
        }
      }
    }

    .button {
      align-self: center;
      margin: 0 0 25px;

      &:first-of-type {
        margin-top: 50px;
      }

      &.delete {
        background: $dark-red;
        margin-top: 20px;
      }
    }

    #error {
      color: $font-col-error;
      font-weight: bold;
      margin: 25px;
      letter-spacing: 0.2px;
    }
  }
</style>