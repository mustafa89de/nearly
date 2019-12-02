<template>
  <modal v-if="showModal"
    :title="modalTitle"
    :text="modalText"
    :confirmText="'reconnect'"
    :abortText="'i don\'t care'"
    @abort="switchShowHide"
    @confirm="reloadPage"
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
        showModal: false,
        modalText: 'Du scheinst offline zu sein. Die Inhalte werden vielleicht nicht richtig angezeigt. Bitte prüfe Deine Internetverbindung.',
        modalTitle: 'Du bist Offline'
      }
    },
    methods: {
      switchShowHide: function (e) {
        this.showModal = !this.showModal;
      },
      reloadPage: function(){
        if(navigator.onLine) document.location.reload();
        else alert('Du bist noch nicht Online, bitte habe noch etwas Geduld.');
      }
    },
    created() {
      window.addEventListener('online', this.reloadPage);
      window.addEventListener('offline', this.switchShowHide);
    }
  }
</script>

<style scoped>

</style>