<template>
  <article>
    <header>
      <h1>Profil</h1>
    </header>
    <user-detail v-if="user" :user="this.user" />
  </article>
</template>

<script>
  import UserDetail from "../components/UserDetail";
  import UserService from "../services/UserService";

  export default {
    data: function () {
      return {
        user: null
      };
    },
    components: {
      "user-detail": UserDetail
    },
    methods: {
      async init() {
        this.user = await UserService.getUserById(this.$route.params.uid);
      }
    },
    mounted() {
      this.init();
    }
  };
</script>

<style scoped lang="scss">
  @import "../assets/variables";
  @import "../assets/mixins";

  article {
    padding: 25px 0 0 0;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  header {
    flex: none;
    margin: 0 25px;

    h1{
      @include textTitle;
      color: $font-col-primary;
      margin: 0;
    }
  }
</style>