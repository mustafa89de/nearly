<template>
  <div :class="['input', {focused: isActive}]">
    <icon v-if="iconType" :iconType="iconType" :iconColor="getIconColor" />
    <input
        :type="passwordVisibility || (type || 'text')"
        :placeholder="placeholder"
        @focus="isActive = true"
        @blur="isActive = false"
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
    />
    <span v-if="type === 'password'" class="password-toggle" @click="togglePasswordVisibility">
      <icon :iconType="passwordVisibility === 'text' ? 'eye' : 'eye-closed'" :iconColor="getIconColor" />
    </span>
    <span v-if="hint" :class="['input-hint', {'hint-visible': showHint}]">{{hint}}</span>
  </div>
</template>

<script>
  import Icon from "../components/Icon.vue";

  export default {
    props: {
      iconType: String,
      placeholder: String,
      type: String,
      value: String,
      hint: String,
      showHint: Boolean
    },
    data: function () {
      return {
        isActive: false,
        passwordVisibility: ""
      };
    },
    components: {
      icon: Icon
    },
    methods: {
      togglePasswordVisibility: function(){
        console.log("test");
        this.passwordVisibility = this.passwordVisibility === "text" ? "password" : "text";
      }
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
  @import "assets/variables";
  @import "assets/mixins.scss"  ;

  .input {
    display: flex;
    padding-bottom: 5px;
    border-bottom: 1px solid $colorBlackLight;
    transition: border-bottom 500ms ease, padding-bottom 200ms ease;

    svg {
      flex: 0 1 auto;
    }

    input {
      @include textBody;
      flex: 1 1 auto;
      width: 80%;
      margin-left: 10px;
      border: 0;
      font-size: 1rem;
      color: $colorBlackLight;
      transition: color 500ms ease;

      &:focus {
        outline: none;
      }
    }

    .input-hint {
      @include textHint;
      flex: none;
      position: absolute;
      bottom: -75%;
      opacity: 0;
      transition: opacity 200ms;
      width: 100%;
      text-align: center;
      color: $colorPrimary;
    }

    .hint-visible {
      opacity: 1;
    }

    .password-toggle{
      cursor: pointer;
    }
  }

  .focused {
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