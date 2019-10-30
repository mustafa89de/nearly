<template>
  <component :is="selectIcon" :class="iconColor"/>
</template>

<script>
  import person from "assets/icons/person.svg";
  import mail from "assets/icons/mail.svg";
  import key from "assets/icons/key.svg";
  import bug from "assets/icons/bug.svg";

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