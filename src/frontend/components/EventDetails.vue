<template>
  <section class="detail">
    <header>
      <h1>{{event? event.name : '...'}}</h1>
      <a v-if="canShare" href="#" @click="shareEvent">
        <icon class="share" iconType="share" iconColor="primary"/>
      </a>
      <a v-else href="#" @click="openShareModal">
        <icon class="share" iconType="share" iconColor="primary"/>
      </a>
    </header>
    <pre class="description">{{ event ? event.description : '...' }}</pre>
    <div class="fieldContainer">
      <text-field class="detailField" iconType="calendar" iconColor="primary" :value="eventDate"/>
      <text-field class="detailField" iconType="clock" iconColor="primary" :value="eventTime"/>
    </div>
    <router-link class="hostLink" :to="event && event.hostName ? '/user/'+ event.hostId : ''">
      <text-field iconType="person" iconColor="primary" :value="event && event.hostName ? event.hostName : '-'"/>
    </router-link>
    <button-send v-if="isCreator" @click="editEvent" type="button" text="bearbeiten"/>
    <button-send v-if="event && event.isParticipant" bordered @click="signOutForEvent" type="button" text="absagen"/>
    <button-send v-else @click="signInForEvent" type="button" text="mitmachen"/>
    <p class="error" v-if="error">{{error}}</p>
    <share-modal v-if="showShareModal" :eventURL="getURL" @close="closeShare"/>
  </section>
</template>

<script>
  import AuthService from "../services/AuthService";
  import TextField from "../components/TextField";
  import Button from "../components/Button.vue";
  import EventService from "../services/EventService";
  import Icon from "../components/Icon.vue";
  import ShareModal from "../components/ShareModal.vue"

  export default {
    name: "EventDetails",
    components: {
      'text-field': TextField,
      'button-send': Button,
      'icon': Icon,
      'share-modal': ShareModal
    },
    props: {
      event: Object,
    },
    data() {
      return {
        error: null,
        showShareModal: false
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
      canShare: function () {
        return navigator.share;
      },
      getURL: function () {
        return window.location.href;
      }
    },
    methods: {
      async editEvent() {
        try {
          await this.$router.push('/event/' + this.event.id + '/edit');
        } catch (err) {
          console.error(err);
        }
      },
      async signInForEvent() {
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
      },
      async shareEvent() {
        if (navigator.share) {
          try {
            await navigator.share({
              url: window.location.href
            });
          } catch (e) {
            console.error("event couldn't be shared ", e);
          }
        }
      },
      openShareModal() {
        this.showShareModal = true;
      },
      closeShare() {
        this.showShareModal = false;
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/variables";
  @import "../assets/mixins";

  .detail {
    flex: 1;
    display: flex;
    flex-flow: column;
    background-color: $bg-col-primary;
    color: $font-col-light;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    border-radius: 0 0 50px 50px;
    padding: 5%;

    header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      h1 {
        @include textTitle;
        color: $font-col-primary;
        margin: 0;
        padding: 0;
      }

      .share {
        height: 32px;
        width: 32px;
      }
    }

    pre.description {
      @include textBody;
      padding: 10px;
      height: 150px;
      background-color: $text-field-col;
      color: $font-col-primary;
      overflow-y: auto;
      white-space: pre-line;
      hyphens: auto;
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
      color: $font-col-active;

      :hover {
        color: $font-col-active;
      }
    }
  }

</style>