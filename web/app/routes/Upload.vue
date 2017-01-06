<template>
  <overlay @close="$router.push('/')">
    <upload-form @upload-success="$router.push('/')"></upload-form>
  </overlay>
</template>

<script>
import Overlay from '../components/Overlay.vue'
import UploadForm from '../components/UploadForm.vue'

export default {
  components: {
    Overlay,
    UploadForm,
  }
}
</script>
