<template>
  <article>
    <h1>Kein Internet!</h1>
    <h2>Hoppla!</h2>
    <p>Du scheinst keine Internetverbindung zu haben! 📶</p>
    <reload-button
        type= 'button'
        text = "Versuch's noch mal!"
        @click= handleReloadButton
        :bordered= "false"
    />
<!--    <img src="static/img/offline.gif" />-->
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
      window.addEventListener('online', () => {
        this.$router.push('/')
      })
    }
  }

  import Button from "../components/Button"</script>

<style scoped lang="scss">
  @import "../assets/variables";
  @import "../assets/mixins";

  
  article {
    @include pageCard;
    display: flex;
    flex-direction: column;

    padding: 25px;

    > h1 {
      @include textTitle;
      font-size: 2rem;
      color: $font-col-active;
      margin: 0 0 50px 0;
    }
  
    > h2 {
      @include textBodyTitle;
      color: $font-col-primary;
      margin: 0;
    }
  
    > p {
      @include textBody;
      color: $font-col-primary;
      margin: 25px 0 25px 0;
    }

    > input[type="button"] {
      margin-top: auto;
      align-self: center;
    }
  }
  
</style>