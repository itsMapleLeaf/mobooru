<template>
  <div>
    <main class="container">
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
    </main>
    <overlay :visible="uploadOverlayVisible" @closed="uploadOverlayVisible = false">
      <upload-form></upload-form>
    </overlay>
  </div>
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

<style lang='scss'>
@import '../styles/mixins';

.mb-button {
  display: inline-block;
  color: #aaa;
  padding: 0.3em 0.6em;
  transition: 0.2s;
}

.mb-button--primary {
  background: rgb(52, 152, 219);
  color: white;
}

.mb-button:hover {
  cursor: pointer;
}

.mb-button:hover, .mb-button:focus {
  color: rgb(41, 128, 185);
}

.mb-button:active {
  color: rgb(41, 128, 185);
}

.mb-input {
  border-bottom: 2px solid #ddd;
  transition: 0.2s border-bottom-color;
  padding: 0.3em 0.6em;
  display: inline-block;
}

.mb-input:hover, .mb-input:focus {
  border-bottom: 2px solid lightskyblue;
}
</style>
