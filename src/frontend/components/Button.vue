<template>
  <input @click="handleClick" :type="type" :value="text" :disabled="disabled"/>
</template>

<script>
  export default {
    props: {
      type: String,
      text: String,
      onClick: Function,
      disabled: Boolean
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

  input {
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

    &:disabled {
      background-color: $button-col-disabled;
    }

    &:hover:not(:disabled) {
      box-shadow: $shadow-default;
      background-color: $button-col-secondary
    }
  }
</style>