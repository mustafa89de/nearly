<template>
  <section v-if="showNotification">
    Um diese Web App zu installieren, tippe
    <icon iconType="ios-share"/>
    und dann auf "Zum Home-Bildschirm
    <icon iconType="ios-add"/>
    "
    <icon @click="closeNotification" id="close" iconType="ios-close"/>
  </section>
</template>

<script>
  import PWAService from "../services/PWAService";
  import Icon from "../components/Icon.vue";

  export default {

    components: {
      icon: Icon
    },
    data: function () {
      return {
        showNotification: PWAService.shouldShowNotification()
      }
    },
    methods: {
      closeNotification: function () {
        this.showNotification = false;
        PWAService.setLastTimeClosed()
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/variables";
  @import "../assets/mixins";

  section {
    position: fixed;
    bottom: 20px;
    left: 50%;
    background: #fff;
    width: calc(100% - 40px);
    max-width: calc(500px - 40px);
    padding: 15px 30px 15px 20px;
    line-height: 1.4;
    border-radius: 10px;
    box-shadow: $shadow-default;
    z-index: 2;
    transform: translateX(-50%);
    font-family: "Arimo", Arial, Helvetica, sans-serif;
    font-size: 18px;

    > svg {
      width: 16px;

      &:first-of-type {
        fill: #007aff;
        align-self: end;
      }

      &:not(#close) {
        margin: 0 2px;
      }

      &#close {
        position: absolute;
        top: 10px;
        right: 10px;
        fill: #777;
        width: 14px;
      }
    }

    &:after {
      content: '';
      width: 0;
      height: 0;
      border-left: 15px solid transparent;
      border-right: 15px solid transparent;
      border-top: 15px solid #fff;

      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
    }
  }
</style>