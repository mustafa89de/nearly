<template>
  <div :class="['input', {focused: isActive}]">
    <icon v-if="iconType" :iconType="iconType" :iconColor="getIconColor" :scaleUp="isActive" />
    <input
        :type="type || 'text'"
        :placeholder="placeholder"
        @focus="isActive = true"
        @blur="isActive = false"
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script>
  import Icon from "../components/Icon.vue";

  export default {
    props: {
      iconType: String,
      placeholder: String,
      type: String,
      value: String
    },
    data: function () {
      return {
        isActive: false
      };
    },
    components: {
      icon: Icon
    },
    computed: {
      getIconColor: function () {
        if (this.isActive) return "primary";
        else return "blackLight";
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../assets/variables";

  .input {
    display: flex;
    padding-bottom: 5px;
    border-bottom: 1px solid $colorBlackLight;
    transition: border-bottom 500ms ease, padding-bottom 200ms ease;

    svg {
      flex: 0 1 auto;
    }

    input {
      flex: 1 1 auto;
      width: 80%;
      margin-left: 10px;
      border: 0;
      font-family: "Gothic A1";
      font-size: 1rem;
      color: $colorBlackLight;
      transition: color 500ms ease;

      &:focus {
        outline: none;
      }
    }
  }

  .focused {
    padding-bottom: 20px;
    border-bottom: 1px solid $colorPrimary;

    input {
      color: $colorPrimary;
    }
  }

  ::-webkit-input-placeholder { /* Chrome */
    color: $colorBlackLight;
    opacity: 0.5;
    transition: color 500ms ease;
  }

  :focus::-webkit-input-placeholder {
    color: $colorPrimary;
  }

  :-ms-input-placeholder { /* IE 10+ */
    color: $colorBlackLight;
    opacity: 0.5;
    transition: color 500ms ease;
  }

  :focus:-ms-input-placeholder {
    color: $colorPrimary;
  }

  ::-moz-placeholder { /* Firefox 19+ */
    color: $colorBlackLight;
    opacity: 0.5;
    transition: color 500ms ease;
  }

  :focus::-moz-placeholder {
    color: $colorPrimary;
  }

  :-moz-placeholder { /* Firefox 4 - 18 */
    color: $colorBlackLight;
    opacity: 0.5;
    transition: color 500ms ease;
  }

  :focus:-moz-placeholder {
    color: $colorPrimary;
  }
</style>