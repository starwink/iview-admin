<template>
  <div>
    <p>modal</p>
    <Button @click="openModal">打开</Button>
    <editorModal ref="editorModal" />
  </div>
</template>
<script>
import editorModal from './component/editorModal.vue'
export default {
  components: {
    editorModal
  },
  data() {
    return {

    }
  },
  methods: {
    openModal() {
        this.$refs.editorModal.init();
    }
  }
}
</script>