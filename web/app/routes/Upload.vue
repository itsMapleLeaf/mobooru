<template>
  <overlay @close="$router.push('/')">
    <upload-form @upload-success="$router.push('/')"></upload-form>
  </overlay>
</template>

<script>
export default {
  components: {
    Overlay: require('../components/Overlay.vue'),
    UploadForm: require('../components/UploadForm.vue'),
  }
}
</script>
