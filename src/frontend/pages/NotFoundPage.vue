<template>
  <article>
    <not-found />
    <div></div>
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
  div{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    background-color: white;
  }
</style>