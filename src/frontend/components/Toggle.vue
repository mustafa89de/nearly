<template>
  <label class="switch">
    <input type="checkbox" v-model="isChecked" @change="toggle">
    <span class="slider round"></span>
  </label>
</template>

<script>
  export default {
    props: {
      checked: Boolean
    },
    data() {
      return {
        isChecked: this.checked
      }
    },
    methods: {
      toggle: function() {
        this.$emit("onToggle", this.isChecked);
      },
    },
    watch: {
      checked: function() {
        this.isChecked = this.checked;
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/variables";
  @import "../assets/mixins";

  .switch{
    position: relative;
    display: inline-block;
    width: 34px;
    height: 14px;

    input{
      opacity: 0;
      width: 0;
      height: 0;

      &:checked + .slider {
        background-color: $tog-col-active-bg;
      }

      &:focus + .slider {
        outline: none;
      }

      &:checked + .slider:before {
        transform: translateX(14px);
        background-color: $tog-col-active;
      }
    }

    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: $tog-col-inactive-bg;
      transition: 400ms;
      border-radius: 100px;

      &::before{
        position: absolute;
        content: "";
        height: 20px;
        width: 20px;
        left: 0;
        bottom: -3px;
        background-color: $tog-col-inactive;
        -webkit-transition: .4s;
        transition: .4s;
        border-radius: 100px;
      }
    }


  }
</style>