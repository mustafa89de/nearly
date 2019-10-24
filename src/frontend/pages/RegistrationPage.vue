<template>
  <article>
    <div class="header">
      <h1>Meeting</h1>
    </div>
    <div class="card">
      <h2>Registrierung</h2>      
      <div class="input">    
        <icon iconType="person"/><input type="text" placeholder="Benutzername"/>
      </div>
    </div>    
  </article>
</template>

<script>
import Icon from "../components/Icon.vue"

export default {
  data: function() {
    return {
      names: ["Bean", "Jonas", "Mustafa", "Tom"]
    };
  },
  components: {
    icon: Icon
  }
};
</script>

<style lang="scss">
  @import "assets/styles";
  @import url(https://fonts.googleapis.com/css?family=DM+Serif+Display|Poppins:700&display=swap);

  body {
    background-color: $colorPrimary;    
  }

  svg path{
    fill: $colorBlackLight;
  }

  .input {
    display: flex;
    border-bottom: 1px solid $colorBlackLight;
    padding-bottom: 5px;

    input {
      margin-left: 5px;
      border: 0;      
    }
    ::placeholder {
        color: $colorBlackLight;
    }
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
      }
    }     
  }
</style>