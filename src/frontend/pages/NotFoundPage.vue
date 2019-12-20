<template>
  <article>
    <not-found/>
  </article>
</template>

<script>
  import NotFound from "../components/NotFound";

  export default {
    components: {
      "not-found": NotFound
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/mixins";

  article {
    @include pageCard;
    padding: 25px;
  }
</style>