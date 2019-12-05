<template>
  <div>
    <text-field :value="formattedRadius" iconType="radius" iconColor="primary"/>
    <input type="range" v-model="currentRadius" min="100" max="5000" step="100"/>
  </div>
</template>

<script>
  import TextField from "./TextField";
  import { INITIAL_MAP_RADIUS } from "../constants";
  import UserService from "../services/UserService";

  export default {
    prop: ["radius"],
    data: function() {
      console.log(this.radius);
      return {
        currentRadius: this.radius
      }
    },
    components: {
      "text-field": TextField
    },
    computed: {
      formattedRadius: function() {
        if(this.currentRadius < 1000) return this.currentRadius + " m";
        else return this.currentRadius / 1000 + " km";
      }
    },
    watch: {
      currentRadius: function(){
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