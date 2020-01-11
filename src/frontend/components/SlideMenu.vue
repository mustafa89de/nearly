<template>
  <article>
    <section :class="['slider', {'slider-visible': sliderVisible}]">
      <h1>{{username || '...'}}</h1>
      <div class="divider" />
      <router-link to="#" :class="['link', {'link-visible': sliderVisible}]"><icon iconType="edit" iconColor="black" /><span>Profil bearbeiten</span></router-link>
      <router-link to="#" :class="['link',{'link-visible': sliderVisible}]"><icon iconType="clock" iconColor="black" /><span>Event-Verlauf</span></router-link>
      <router-link to="#" :class="['link',{'link-visible': sliderVisible}]"><icon iconType="help" iconColor="black" /><span>Hilfe</span></router-link>
      <div class="divider" />
      <a href="#" @click="handleLogout" :class="['logout', 'link', {'link-visible': sliderVisible}]"><icon iconType="logout" iconColor="error" /><span>Abmelden</span></a>
    </section>
    <div :class="['background', {'background-visible': sliderVisible}]"></div>
  </article>
</template>

<script>
  import AuthService from "../services/AuthService";
  import Icon from "../components/Icon"

  export default {
    components: {
      icon: Icon
    },
    props: {
      sliderVisible: false,
      username: ""
    },
    methods: {
      toggleSlider: function(e){
        this.sliderVisible = !this.sliderVisible;
      },
      handleLogout: async function () {
       await AuthService.logout();
      }
    },
  }
</script>

<style scoped lang="scss">
  @import "../assets/variables";
  @import "../assets/mixins";
  .slider{
    position: fixed;
    height: 100%;
    width: 0;
    top: 0;
    right: 0;
    z-index: 10;
    background-color: $bg-col-primary;
    box-shadow: $shadow-default;
    transition: width 500ms ease-in-out;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;

    h1{
      @include textBody;
      margin: 25px 25px 0 25px;
    }

    .divider{
      width: 100%;
      height: 1px;
      background-color: $font-col-light;
      margin-top: 25px;
    }

    .logout{
      margin-top: 12px !important;
      margin-bottom: 12px !important;
      transition-delay: 300ms !important;
      span{
        color: $font-col-error;
      }
    }

    .link{
      margin: 25px 25px 0 25px;
      margin-left: 100px;
      transition: margin-left 500ms ease;
      transition-delay: 200ms;
      white-space: nowrap;
      text-decoration: none;
      color: $font-col-primary;
      display: inline-block;

      span{
        @include textBody;
        padding: 0;
        vertical-align: middle;
        line-height: 32px;
        overflow: hidden;
      }

      svg{
        width: 32px;
        height: 32px;
        margin-right: 15px;
        float: left;
      }
    }

    & .link-visible{
      margin-left: 25px;
    }
  }

  .slider-visible{
    width: $slider-width;
  }

  .divider:last-of-type{
    margin-top: auto;
  }

  .background{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 5;
    visibility: hidden;
  }

  .background-visible{
    visibility: visible;
  }
</style>