<template>
  <component :is="selectIcon" />
</template>

<script>
import person from "assets/icons/person.svg";
import mail from "assets/icons/mail.svg";
import key from "assets/icons/key.svg";
import bug from "assets/icons/bug.svg";

export default {
  props: {
      iconType: String
  },  
  computed: {
    selectIcon: function(){
      switch(this.iconType){
        case "person":
          return person;
        default:
          return person;
      }      
    }
  }
};
</script>

<style lang="scss">
  @import "assets/styles";
  path{
    fill: $colorBlackLight;
  }
</style>