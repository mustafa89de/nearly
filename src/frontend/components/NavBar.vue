<template>
  <nav>
    <router-link to="/">
      <icon iconType="home"/>
    </router-link>
    <router-link to="/event/create">
      <icon iconType="place-add"/>
    </router-link>
    <router-link to="/links">
      <icon iconType="person"/>
    </router-link>
  </nav>
</template>

<script>
  import Icon from "./Icon";

  export default {
    components: {
      'icon': Icon
    }
  };
</script>

<style scoped lang="scss">
  @import "../assets/variables";

  nav {
    position: fixed;
    bottom: 0;

    width: 100%;
    max-width: 500px;

    z-index: 1;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
    background: white;

    height: $nav-height;
    padding: 0 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
</style>


<style scoped lang="scss">
  svg {
    height: 32px;
    width: 32px;
  }
</style>