<template>
  <article>
    <h1>{{`Hello ${ this.names.join(', ') }!`}}</h1>
  </article>
</template>

<script>
export default {
  data: function() {
    return {
      names: ["Bean", "Jonas", "Mustafa", "Tom"]
    };
  }
};
</script>

<style scoped lang="scss">
  h1 {
    color: #db0000;
  }
</style>