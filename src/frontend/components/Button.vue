<template>
  <input :type="type" :value="text" @click="onClick" />
</template>

<script>
  export default {
    props: {
      type: String,
      text: String,
      onClick: Function
    },
    data: function() {
      return {};
    }
  };
</script>

<style scoped lang="scss">
  @import "assets/styles";

  input {
    @include textButton;
    width: 70%;
    background: $colorSecondary;
    color: $colorWhite;
    padding: 15px;
    border: none;
    border-radius: 30px;
    transition: background-color 500ms ease, box-shadow 500ms ease;

    &:hover {
      box-shadow: $shadowDefault;      
      cursor: pointer;
      background-color: $colorPrimary;
    }

    &:active {
      background-color: darken($colorPrimary, 10%);
    }
  }
</style>