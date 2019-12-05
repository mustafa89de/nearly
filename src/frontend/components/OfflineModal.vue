<template>
  <modal v-if="showModal"
    :title="'Du bist Offline'"
    :text="'Du scheinst offline zu sein. Die Inhalte werden vielleicht nicht richtig angezeigt. Bitte prüfe Deine Internetverbindung.'"
    :confirmText="'reconnect'"
    :abortText="'i don\'t care'"
    @abort="handleOffline"
    @confirm="handleOnline"
  />
</template>

<script>
  import ConfirmationModal from './ConfirmationModal';

  export default {
    components: {
      'modal': ConfirmationModal
    },
    data() {
      return {
        showModal: !navigator.onLine
      }
    },
    methods: {
      handleOffline: function (e) {
        this.showModal = !this.showModal;
      },
      handleOnline: function(e){
        document.location.reload();
      }
    },
    created() {
      window.addEventListener('online', this.handleOnline);
      window.addEventListener('offline', this.handleOffline);
    }
  }
</script>

<style scoped>

</style>