<template>
  <router-link v-if="type === 'link'" :to="to">{{text}}</router-link>
  <input v-else :type="type" :value="text" @click="handleClick" :disabled="disabled"/>
</template>

<script>
  export default {
    props: {
      type: String,
      text: String,
      onClick: Function,
      disabled: Boolean,
      to: String
    },
    methods: {
      handleClick: function (e) {
        this.$emit('click', e);
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../assets/variables";
  @import "../assets/mixins";

  input, a {
    @include textButton;
    width: 70%;
    background: $button-col-primary;
    color: $font-col-secondary;
    padding: 15px;
    border: none;
    border-radius: 30px;
    transition: background-color 500ms ease, box-shadow 500ms ease;
    appearance: none;
    outline: none;
    cursor: pointer;
    text-align: center;
    text-decoration: none;

    &:active {
        background-color: darken($button-col-secondary, 10%);
    }

    &:disabled {
      background-color: $button-col-disabled;
    }

    &:hover:not(:disabled) {
      box-shadow: $shadow-default;
      background-color: $button-col-secondary
    }
  }
</style>