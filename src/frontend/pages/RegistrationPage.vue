<template>
  <article>
    <div class="header">
      <h1>Meeting</h1>
    </div>
    <div class="card">
      <h2>Registrierung</h2>      
    </div>    
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

<style lang="scss">
  @import "assets/styles";
  @import url(https://fonts.googleapis.com/css?family=DM+Serif+Display|Poppins:700&display=swap);

  body {
    background-color: $colorPrimary;    
  }

  article{
    display: flex;
    flex-flow: column;
    height: 100%;

    .header{
      flex: 0 1 auto;
      padding: 50px 25px 50px 25px;

      h1{
        color: $colorWhite;
        font-family: "DM Serif Display", 'Times New Roman', Times, serif;
        font-size: 2rem;
      }
    }

    .card{
      flex: 1 1 auto;
      background-color: $colorWhite;
      border-radius: 50px 50px 0px 0px;
      padding: 50px 25px 50px 25px;
      box-shadow: $shadowDark;

      h2{
        @include textTitle;
        color: $colorBlack;
      }
    }     
  }
</style>