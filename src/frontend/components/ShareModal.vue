<template>
  <article>
    <section>
      <h3>Teile dieses Event</h3>
      <a class="social-container" :href="'http://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(eventURL)" target="_blank" rel="noopener">
        <icon iconType="facebook" iconColor="white"/>
        <p>Facebook</p>
      </a>
      <a class="social-container" :href="'https://twitter.com/intent/tweet?text=' + encodeURIComponent(eventURL)" target="_blank" rel="noopener">
        <icon iconType="twitter" iconColor="white"/>
        <p>Twitter</p>
      </a>
      <a class="social-container" href="#" @click="setClipboard">
        <icon iconType="link" iconColor="white"/>
        <p>Link kopieren</p>
      </a>
      <custom-button
        class="abort-button"
        bordered
        type="button"
        text="Abbrechen"
        @click="$emit('close')"
      />
    </section>
    <div id="background" @click="$emit('close')"/>
  </article>
</template>

<script>
  import Button from "./Button";
  import Icon from "./Icon";

  export default {
    props: {
      eventURL: String
    },
    components: {
      'custom-button': Button,
      'icon': Icon
    },
    methods: {
      setClipboard: function(){
        if(navigator.clipboard){
          try{
            navigator.clipboard.writeText(this.eventURL);
          } catch(e){
            console.error("couldn't write to clipboard", e);
          }
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../assets/variables";
  @import "../assets/mixins";

  article {

    section {
      display: flex;
      flex-direction: column;
      z-index: 4;

      position: fixed;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      max-width: 500px;
      background: #FFFFFF;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      border-radius: 0 0 50px 50px;
      padding: 50px 25px 0;

      > h3 {
        @include textTitle;
        color: $font-col-primary;
        margin: 0 0 25px;
      }

      > .social-container {
        width: 70%;
        align-self: center;
        margin-bottom: 25px;
        padding-left: 10%;
        display: flex;
        align-items: center;
        background-color: $bg-col-secondary;
        border-radius: 100px;
        appearance: none;
        outline: none;
        transition: background-color 500ms ease, box-shadow 500ms ease;

        > p {
          @include textButton;
          color: $font-col-secondary;
          text-decoration: none;
        }

        > svg {
          height: 32px;
          width: 32px;
          margin-right: 10px;
        }

        &:visited, &:link {
          text-decoration: none;
        }

        &:hover:not(:disabled) {
          box-shadow: $shadow-default;
          background-color: $button-col-secondary
        }
      }

      > .abort-button {
        align-self: center;
        margin-bottom: 25px;
      }
    }

    > #background {
      z-index: 3;
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background: #111821;
      opacity: 0.1;;
    }
  }
</style>