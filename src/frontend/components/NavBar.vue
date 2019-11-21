<template>
  <footer>
    <nav>
      <router-link to="/">
        <icon :iconColor="state === 'overview' ? 'primary' : 'blackLight'" iconType="home"/>
      </router-link>
      <router-link to="/event/create">
        <icon :iconColor="state === 'create' ? 'primary' : 'blackLight'" iconType="place-add"/>
      </router-link>
      <router-link to="/me">
        <icon :iconColor="state === 'me' ? 'primary' : 'blackLight'" iconType="person"/>
      </router-link>
    </nav>
  </footer>
</template>

<script>
  import Icon from "./Icon";

  export default {
    props: {
      state: String // overview, create, me
    },
    components: {
      'icon': Icon
    }
  };
</script>

<style scoped lang="scss">
  @import "../assets/variables";

  footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: $nav-height;

    z-index: 2;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
    background: white;
  }

  nav {
    width: 100%;
    max-width: 500px;
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