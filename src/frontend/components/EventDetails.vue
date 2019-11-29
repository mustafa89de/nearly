<template>
  <article>
    <h1>{{event? event.name : '...'}}</h1>
    <!-- TODO: Implement share Button -->
    <p class="description">{{ event ? event.description : '...' }}</p>
    <div class="fieldContainer">
      <text-field class="detailField" iconType="calendar" iconColor="primary" :value="eventDate"/>
      <text-field class="detailField" iconType="clock" iconColor="primary" :value="eventTime"/>
    </div>
    <a class="hostLink" :href="event && event.hostName ? '/user/'+ event.hostId : null">
      <text-field iconType="person" iconColor="primary" :value="event ? (event.hostName || '-') : '...'"/>
    </a>
    <button-send v-if="isCreator" @click="editEvent" type="button" text="bearbeiten"/>
    <button-send v-if="event && event.isParticipant" bordered @click="signOutForEvent" type="button" text="absagen"/>
    <button-send v-else @click="signInForEvent" type="button" text="mitmachen"/>
    <p class="error" v-if="error">{{error}}</p>
  </article>
</template>

<script>
  import AuthService from "../services/AuthService";
  import TextField from "../components/TextField";
  import Button from "../components/Button.vue";
  import EventService from "../services/EventService";

  export default {
    name: "EventDetails",
    components: {
      'text-field': TextField,
      'button-send': Button
    },

    props: {
      event: Object,
    },

    data() {
      return {
        error: null
      };
    },

    computed: {
      isCreator: function () {
        if (this.event) {
          const thisUserId = AuthService.getUser().userId;
          return thisUserId === this.event.hostId;
        } else {
          return false;
        }
      },

      eventDate: function () {
        if (!this.event) return '...';
        return new Date(this.event.time).toLocaleDateString();
      },

      eventTime: function () {
        if (!this.event) return '...';
        return new Date(this.event.time).toLocaleTimeString('de-De', {hour: '2-digit', minute: '2-digit'})
      },
    },

    methods: {
      async editEvent(e) {
        try {
          await this.$router.push('/event/' + this.event.id + '/edit');
        } catch (err) {
          console.error(err);
        }
      },

      async signInForEvent(e) {
        try {
          await EventService.signInForEvent(this.event.id);
          this.event.isParticipant = true;
        } catch (err) {
          console.error(err);
          this.error = "Bei der Anmeldung ist leider etwas schief gelaufen.";
        }
      },

      async signOutForEvent() {
        try {
          await EventService.signOutForEvent(this.event.id);
          this.event.isParticipant = false;
        } catch (err) {
          console.error(err);
          this.error = "Bei der Abmeldung ist leider etwas schief gelaufen.";
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/variables";
  @import "../assets/mixins";

  article {
    flex: 1;
    display: flex;
    flex-flow: column;
    background-color: $bg-col-primary;
    color: $font-col-light;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    border-radius: 0px 0px 50px 50px;
    padding: 5%;

    h1 {
      @include textTitle;
      color: $font-col-primary;
      margin: 0;
    }

    p.description {
      @include textBody;
    }

    p.error {
      color: $font-col-error;
    }

    .fieldContainer {
      flex: 1;
      display: flex;
      flex-flow: row wrap;
    }

    .detailField {
      min-width: 50%;
    }

    > input[type="button"] {
      margin-top: 5%;
      align-self: center;
    }

    .hostLink {
      text-decoration: none;
      color: $font-col-primary;

      :hover {
        color: $font-col-active;
      }
    }
  }


</style>