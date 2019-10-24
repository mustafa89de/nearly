<template>  
  <div :class="['textInput', {focused: focused}]">    
    <icon v-if="iconType" :iconType="iconType" :iconColor="getIconColor" />
    <input type="text" :placeholder="placeholder" @focus="focused = true" @blur="focused = false"/>
  </div>
</template>

<script>
import Icon from "../components/Icon.vue"

export default {
  props: {    
    iconType: String,
    placeholder: String
  },
  data: function() {    
    return {
      focused: false
    };
  },
  components: {
    icon: Icon
  },
  computed: {
    getIconColor: function(){
      if(this.focused) return "primary";
      else return "blackLight";
    }
  }
};
</script>

<style scoped lang="scss">
  @import "assets/styles";

  .textInput {    
    display: flex;    
    padding-bottom: 5px;    
    border-bottom: 1px solid $colorBlackLight;    
    transition: border-bottom 500ms ease;

    input {
      width: 90%;
      margin-left: 10px;
      border: 0;
      font-family: "Gothic A1";
    }
  }

  .focused {
    border-bottom: 1px solid $colorPrimary;    
  }

  ::-webkit-input-placeholder { /* Chrome */
    color: $colorBlackLight;
    transition: color 500ms ease;
  }
  :focus::-webkit-input-placeholder {
    color: $colorPrimary;
  }
  :-ms-input-placeholder { /* IE 10+ */
    color: $colorBlackLight;
    transition: color 500ms ease
  }
  :focus:-ms-input-placeholder {
    color: $colorPrimary;
  }
  ::-moz-placeholder { /* Firefox 19+ */
    color: $colorBlackLight;
    opacity: 1;
    transition: color 500ms ease
  }
  :focus::-moz-placeholder {
    color: $colorPrimary;
  }
  :-moz-placeholder { /* Firefox 4 - 18 */
    color: $colorBlackLight;
    opacity: 1;
    transition: color 500ms ease
  }
  :focus:-moz-placeholder {
    color: $colorPrimary;
  }
</style>