<template>
  <router-link v-if="type === 'link'" :to="to">{{text}}</router-link>
  <input v-else :type="type" :value="text" @click="onClick || null" :disabled="disabled"/>
</template>

<script>
  export default {
    props: {
      type: String,
      text: String,
      onClick: Function,
      disabled: Boolean,
      to: String
    }
  };
</script>

<style scoped lang="scss">
  @import "assets/variables";
  @import "assets/mixins";

  input, a {
    @include textButton;
    width: 70%;
    background: $colorSecondary;
    color: $colorWhite;
    padding: 15px;
    border: none;
    border-radius: 30px;
    transition: background-color 500ms ease, box-shadow 500ms ease;
    appearance: none;
    text-align: center;
    text-decoration: none;

    &:hover {
      box-shadow: $shadowDefault;
      cursor: pointer;
      background-color: $colorPrimary;
    }

    &:active {
      background-color: darken($colorPrimary, 10%);
    }

    &:disabled {
      background-color: $colorGrey;
    }

    &:focus {
      outline: none;
      box-shadow: $shadowDefault;
      cursor: pointer;
      background-color: $colorPrimary
    }
  }
</style>