<template>
  <article>
    <div class="header">
      <h1>Meeting</h1>
    </div>
    <div class="card">
      <h2>Registrierung</h2>      
      <div class="textinput-wrapper"><textinput iconType="person" placeholder="Benutzername" /></div>
      <div class="textinput-wrapper"><textinput iconType="mail" placeholder="E-Mail" /></div>
      <div class="textinput-wrapper"><textinput iconType="key" placeholder="Password" /></div>      
    </div>    
  </article>
</template>

<script>
import Icon from "../components/Icon.vue"
import TextInput from "../components/TextInput.vue"

export default {
  data: function() {
    return {};
  },
  components: {
    icon: Icon,
    textinput: TextInput
  }
};
</script>

<style lang="scss">
  @import "assets/styles";

  body {
    background-color: $colorPrimary;    
  }

  article {
    display: flex;
    flex-flow: column;
    height: 100%;

    .header {
      flex: 0 1 auto;
      padding: 50px 25px 50px 25px;

      h1 {
        color: $colorWhite;
        font-family: "DM Serif Display", 'Times New Roman', Times, serif;
        font-size: 2rem;        
      }
    }

    .card {
      flex: 1 1 auto;
      background-color: $colorWhite;
      border-radius: 50px 50px 0px 0px;
      padding: 50px 25px 50px 25px;
      box-shadow: $shadowDark;

      h2 {
        @include textTitle;
        color: $colorBlack;
        margin: 0;        
      }      
    }     
  }

  .textinput-wrapper {
    margin-top: 50px;
  }
</style>