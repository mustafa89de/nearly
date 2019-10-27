<template>
  <component :is="selectIcon" :class="[iconColor, {iconScale: scaleUp}]"/>
</template>

<script>
  import person from "assets/icons/person.svg";
  import mail from "assets/icons/mail.svg";
  import key from "assets/icons/key.svg";
  import bug from "assets/icons/bug.svg";

  export default {
    props: {
      iconType: String,
      iconColor: String,
      scaleUp: Boolean
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
          default:
            return bug;
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "assets/variables";

  svg {
    transition: transform 200ms;
  }

  .iconScale {
    transform: scale(1.3);
  }

  path {
    transition: fill 500ms ease;
  }

  .primary {
    path {
      fill: $colorPrimary;
    }
  }

  .secondary {
    path {
      fill: $colorSecondary;
    }
  }

  .white {
    path {
      fill: $colorWhite;
    }
  }

  .black {
    path {
      fill: $colorBlack;
    }
  }

  .blackLight {
    path {
      fill: $colorBlackLight;
    }
  }
</style>