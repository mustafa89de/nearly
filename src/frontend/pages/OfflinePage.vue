<template>
  <article>
    <h1>No Internet!</h1>
    <h2>Hoppla!</h2>
    <p>Leider scheinst du kein Internet zu haben! </p>
    <reload-button
        type= 'button'
        text = "Let me back!"
        @click= handleReloadButton
        :bordered= "false"
    />
    <img src="static/img/offline.gif" />
    <div></div>
  </article>
</template>

<script>
  export default {
    components:{
      'reload-button': Button
    },
    
    methods:{
      handleReloadButton(){
        this.$router.push('/');
      }
    },

    created(){
      window.addEventListener('online', (e) => {
        this.$router.push('/')
      })
    }
  }
  
  import Button from "../components/Button"
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
      margin: 25px 0 25px 0;
    }
  }
  
</style>