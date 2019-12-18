<template>
  <article>
    <h1>No Internet!</h1>
    <h2>Hoppla!</h2>
    <p>Leider scheinst du kein Internet zu haben! </p>
    <div></div>
  </article>
</template>

<script>
  export default {
    created(){
      window.addEventListener('online', (e) => this.$router.push('/'))
    }
  }
</script>

<style scoped lang="scss">
  
  @import "../assets/variables";
  @import "../assets/mixins";
  
  div{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    background-color: white;
  }
  
  article {
    padding: 25px;
    h1 {
      @include textTitle;
      font-size: 2rem;
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