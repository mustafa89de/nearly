<template>
  <div class="content">
    <icon v-if="iconType" :iconType="iconType" :iconColor="iconColor"/>
    <span>{{ value }}</span>
  </div>
</template>

<script>
  import Icon from "../components/Icon.vue";

  export default {
    props: {
      iconType: String,
      iconColor: String,
      value: [String, Number, Date]
    },
    
    components: {
      icon: Icon
    },
  };
</script>

<style scoped lang="scss">
  @import "../assets/variables";
  @import "../assets/mixins.scss";

  .content {
    display: flex;
    align-items: center;

    svg {
      flex: none
    }

    span {
      @include textBody;
      flex: 1;
      padding: 10px;
      padding-left: 20px;
      border: 0;
      font-size: 18px;
    }
  }


</style>