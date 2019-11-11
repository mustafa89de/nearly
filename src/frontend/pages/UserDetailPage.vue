<template>
  <article>
    <not-found-comp class="not-found" v-if="notFound"/>
    <div v-else>
      <header>
        <h1>Profil</h1>
      </header>
      <user-detail v-if="user" :user="this.user" />
    </div>
  </article>
</template>

<script>
  import UserDetail from "../components/UserDetail";
  import UserService from "../services/UserService";
  import NotFound from "../components/NotFound";

  export default {
    data: function () {
      return {
        user: null,
        notFound: false
      };
    },
    components: {
      "user-detail": UserDetail,
      "not-found-comp": NotFound
    },
    methods: {
      async init() {
        try {
          this.user = await UserService.getUserById(this.$route.params.uid);
        } catch(err) {
          if(err.status === 404) this.notFound = true;
          console.error(err);
        }
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

    .not-found{
      margin: 25px;
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
  }
</style>