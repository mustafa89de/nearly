<template>
  <section v-if="showNotification">
    Um diese Web App zu installieren, tippe <span>􀈂</span> und dann auf "Zum Home-Bildschirm <span>􀃜</span>"
    <span @click="closeNotification" id="close">􀆄</span>
  </section>
</template>

<script>
  import PWAService from "../services/PWAService";

  export default {
    data: function () {
      return {
        showNotification: PWAService.shouldShowNotification()
      }
    },
    methods: {
      closeNotification: function () {
        this.showNotification = false
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
    border-radius: 5px;
    box-shadow: $shadow-default;
    z-index: 2;
    transform: translateX(-50%);
    font-family: "Arimo", Arial, Helvetica, sans-serif;

    > span {
      font-family: "SF Pro Text";

      &:first-of-type {
        color: #007aff;
      }

      &#close {
        position: absolute;
        top: 10px;
        right: 10px;
        color: #777;
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