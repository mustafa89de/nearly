<template>
  <article>
    <h1>404</h1>
    <h2>Hoppla!</h2>
    <p>Deine angefrage Seite konnte leider nicht gefunden werden.</p>
  </article>
</template>

<script>
</script>

<style scoped lang="scss">
  @import "../assets/variables";
  @import "../assets/mixins";

  article {
    h1 {
      @include textTitle;
      font-size: 5rem;
      color: $font-col-active;
      margin: 0 0 50px 0;
    }

    h2 {
      @include textBodyTitle;
      color: $font-col-primary;
      margin: 0;
    }

    p {
      @include textBody;
      color: $font-col-primary;
      margin: 25px 0 auto 0;
    }
  }
</style>