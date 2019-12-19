<template>
  <component @click="$listeners && $listeners.click ? $emit('click') : null" :is="selectIcon" :class="iconColor"/>
</template>

<script>
  import person from "../assets/icons/person.svg";
  import mail from "../assets/icons/mail.svg";
  import key from "../assets/icons/key.svg";
  import check from "../assets/icons/check.svg";
  import eye from "../assets/icons/eye.svg";
  import eyeClosed from "../assets/icons/eye-closed.svg";
  import bug from "../assets/icons/bug.svg";
  import latitude from "../assets/icons/latitude.svg";
  import longitude from "../assets/icons/longitude.svg";
  import calendar from "../assets/icons/calendar.svg";
  import clock from "../assets/icons/clock.svg";
  import checkCircle from "../assets/icons/check-circle.svg";
  import errorCircle from "../assets/icons/error-circle.svg";
  import placeAdd from "../assets/icons/place-add.svg";
  import home from "../assets/icons/home.svg";
  import menu from "../assets/icons/menu.svg";
  import edit from "../assets/icons/edit.svg";
  import help from "../assets/icons/help.svg";
  import logout from "../assets/icons/logout.svg";
  import share from "../assets/icons/share.svg";
  import link from "../assets/icons/link.svg";
  import facebook from "../assets/icons/facebook.svg";
  import twitter from "../assets/icons/twitter.svg";
  import iosAdd from "../assets/icons/ios-add.svg";
  import iosClose from "../assets/icons/ios-close.svg";
  import iosShare from "../assets/icons/ios-share.svg";

  export default {
    props: {
      iconType: String,
      iconColor: String
    },
    computed: {
      selectIcon: function () {
        switch (this.iconType) {
          case "person":
            return person;
          case "mail":
            return mail;
          case "key":
            return key;
          case "check":
            return check;
          case "eye":
            return eye;
          case "eye-closed":
            return eyeClosed;
          case "check-circle":
            return checkCircle;
          case "error-circle":
            return errorCircle;
          case "latitude":
            return latitude;
          case "longitude":
            return longitude;
          case "calendar":
            return calendar;
          case "clock":
            return clock;
          case "place-add":
            return placeAdd;
          case "home":
            return home;
          case "menu":
            return menu;
          case "edit":
            return edit;
          case "help":
            return help;
          case "logout":
            return logout;
          case "share":
            return share;
          case "link":
            return link;
          case "facebook":
            return facebook;
          case "twitter":
            return twitter;
          case "ios-share":
            return iosShare;
          case "ios-add":
            return iosAdd;
          case "ios-close":
            return iosClose;
          default:
            return bug;
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../assets/variables";

  path {
    transition: fill 500ms ease;
  }

  .primary {
    path {
      fill: $icon-col-primary;
    }
  }

  .white {
    path {
      fill: $icon-col-white;
    }
  }

  .black {
    path {
      fill: $icon-col-black;
    }
  }

  .light-black {
    path {
      fill: $icon-col-light-black;
    }
  }

  .error {
    path {
      fill: $red;
    }
  }
</style>