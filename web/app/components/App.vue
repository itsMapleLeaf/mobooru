<template>
  <main>
    <section class="container">
      <site-header class="container-item">
        <h2 class="header-title header-item">
          <a href="/">mobooru</a>
        </h2>
        <input class="mb-input header-item header-item--stretch" placeholder="Search...">
        <button class="mb-button header-item">
          <i class="mdi mdi-magnify"></i>
        </button>
        <button class="mb-button header-item" @click="uploadOverlayVisible = true">
          <i class="mdi mdi-upload"></i>
        </button>
      </site-header>
      <image-list class="container-item container-item--stretch"></image-list>
    </section>
    <overlay :visible="uploadOverlayVisible" @closed="uploadOverlayVisible = false">
      <upload-form></upload-form>
    </overlay>
  </main>
</template>

<script>
import SiteHeader from './SiteHeader.vue'
import ImageList from './ImageList.vue'
import Overlay from './Overlay.vue'
import UploadForm from './UploadForm.vue'

export default {
  components: {
    SiteHeader,
    ImageList,
    Overlay,
    UploadForm,
  },
  data: () => ({
    uploadOverlayVisible: false
  })
}
</script>

<style lang='scss' scoped>
@import '../styles/mixins';

.container {
  @include fullscreen;

  display: flex;
  flex-direction: column;
}

.container-item {
  flex-shrink: 0;
}

.container-item--stretch {
  flex-grow: 1;
  height: 0;
}
</style>
