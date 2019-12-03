<template>
  <div>
    <text-field :value="formattedRadius" iconType="radius" iconColor="primary"/>
    <input type="range" v-model="currentRadius" min="0.1" max="10" step="0.1"/>
  </div>
</template>

<script>
  import TextField from "./TextField"

  export default {
    prop: {
      userRadius: Number
    },
    data: function() {
      return {
        currentRadius: this.userRadius ? this.userRadius : 1
      }
    },
    components: {
      "text-field": TextField
    },
    computed: {
      formattedRadius: function() {
        return this.currentRadius % 1 != 0 || this.currentRadius == 10 ? this.currentRadius + " km" : this.currentRadius + ".0 km";
      }
    },
    watch: {
      currentRadius: function() {
        this.$emit("onChange", this.currentRadius);
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../assets/variables";
  @import "../assets/mixins";

  input[type="range"] {
    appearance: none;
    width: 100%;
    height: 2px;
    background: transparent;
    outline: none;
    background: $slider-col-track;
  }

  input[type="range"]:focus {
    outline: none;
  }

  input[type="range"]::-webkit-slider-thumb {
    appearance: none;
    width: 16px;
    height: 16px;
    background: $slider-col-thumb;
    border: none;
    border-radius: 100%;
    cursor: pointer;
  }

  input[type="range"]::-moz-range-thumb {
    appearance: none;
    width: 16px;
    height: 16px;
    background: $slider-col-thumb;
    border: none;
    border-radius: 100%;
    cursor: pointer;
  }
</style>