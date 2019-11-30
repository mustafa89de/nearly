<template>
  <article id="offlineoverlay">
    <section class="content">
      <div class="message">Du bist offline!</div>
      <reload-button type="button" text="reload" />
    </section>
  </article>
</template>

<script>
  import Button from "./Button";
  
  export default {
    components:{
      'reload-button': Button
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/variables";
  
  article{
    position: fixed;
    width: 100%;
    max-width: 500px;
    
    visibility: hidden;
    display: block;
    z-index: 100;
    
    margin: 0;
    padding: 25px;
  
    background-color: $grey;
    color: $font-col-active;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
    box-shadow: $shadow-default;
  }
  
  .content{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: baseline;
  }
  
  .message{
    width: 28%;
    padding: 0;
  }
</style>