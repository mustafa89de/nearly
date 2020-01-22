<template>
  <div :class="['input', {focused: isActive}]">
    <icon v-if="iconType" :iconType="iconType" :iconColor="getIconColor"/>
    <input
        :type="passwordVisibility || (type || 'text')"
        :placeholder="placeholder"
        @focus="isActive = true"
        @blur="isActive = false"
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
        :step="step"
        ref="input"
    />
    <span v-if="type === 'password'" class="password-toggle" @click="togglePasswordVisibility">
      <icon :iconType="passwordVisibility === 'text' ? 'eye-closed' : 'eye'" :iconColor="getIconColor"/>
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
      value: [String, Number],
      step: String,
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
      togglePasswordVisibility: function () {
        this.passwordVisibility = this.passwordVisibility === "text" ? "password" : "text";
        this.$refs["input"].focus();
      }
    },
    computed: {
      getIconColor: function () {
        if (this.isActive) return "primary";
        else return "light-black";
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../assets/variables";
  @import "../assets/mixins.scss";

  .input {
    display: flex;
    align-items: center;
    border-bottom: 1px solid $light-black;
    transition: border-bottom 500ms ease, padding-bottom 200ms ease;

    svg {
      flex: none
    }

    input {
      @include textBody;
      flex: 1;
      padding: 10px;
      border: 0;
      font-size: 18px;
      color: $font-col-light;
      transition: color 500ms ease;

      &::placeholder {
        color: $placeholder-col;
        transition: color 500ms ease;
      }

      &:focus {
        outline: none;

        &::placeholder {
          color: $placeholder-col-active;
        }
      }
    }

    .input-hint {
      @include textHint;
      flex: none;
      position: absolute;
      top: 120%;
      opacity: 0;
      transition: opacity 200ms;
      width: 100%;
      text-align: center;
      color: $font-col-error;
    }

    .hint-visible {
      opacity: 1;
    }

    .password-toggle {
      cursor: pointer;
      font-size: 0;
    }
  }

  .focused {
    border-bottom: 1px solid $font-col-active;

    input {
      color: $font-col-active;
    }
  }


</style>