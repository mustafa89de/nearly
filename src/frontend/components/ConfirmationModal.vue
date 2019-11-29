<template>
  <article>
    <section>
      <h3>{{title}}</h3>
      <p>{{text}}</p>
      <custom-button
          type="button"
          :text="confirmText || 'Bestätigen'"
          @click="$emit('confirm')"
      />
      <custom-button
          type="button"
          :text="abortText || 'Abbrechen'"
          @click="$emit('abort')"
      />
    </section>
    <div id="background"/>
  </article>
</template>

<script>
  import Button from "./Button";

  export default {
    props: {
      title: String,
      text: String,
      confirmText: String,
      abortText: String
    },
    methods: {},
    components: {
      'custom-button': Button
    },
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
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      max-width: 500px;
      background: #FFFFFF;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      border-radius: 50px 50px 0 0;
      padding: 50px 25px 0;

      > h3 {
        @include textTitle;
        margin: 0 0 25px;
      }

      > p {
        @include textBody;
        margin: 0 0 50px;
      }

      > input {
        align-self: center;
        margin-bottom: 25px;

        &:nth-of-type(2) {
          padding-top: 10px;
          padding-bottom: 10px;
          color: $button-col-primary;
          border: 5px solid $button-col-primary;
          background-color: $bg-col-primary;
        }
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