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
        <button class="mb-button header-item" @click="overlays.push('upload')">
          <i class="mdi mdi-upload"></i>
        </button>
      </site-header>
      <image-list class="container-item container-item--stretch">
        <image-thumbnail v-for="id in images" :id="id" @click.native.prevent="displayImage(id)">
        </image-thumbnail>
      </image-list>
    </section>
    <transition name="fade">
      <overlay v-if="currentOverlay === 'imagePreview'" @close="overlays.pop()">
        <img class="previewedImage" :src="`/api/image/${currentImage}`" @click="overlays.pop()">
      </overlay>
    </transition>
    <transition name="fade">
      <overlay v-if="currentOverlay === 'upload'" @close="overlays.pop()">
        <upload-form @upload-success="overlays.pop()"></upload-form>
      </overlay>
    </transition>
  </main>
</template>

<script>
import ImageList from './ImageList.vue'
import ImageThumbnail from './ImageThumbnail.vue'
import Overlay from './Overlay.vue'
import SiteHeader from './SiteHeader.vue'
import UploadForm from './UploadForm.vue'

export default {
  components: {
    ImageList,
    ImageThumbnail,
    Overlay,
    SiteHeader,
    UploadForm,
  },
  data() {
    return {
      images: [],
      overlays: [],
      currentImage: '',
    }
  },
  mounted() {
    window.fetch('/api/images?count=50')
      .then(res => res.json())
      .then(res => { this.images = res.images })
  },
  computed: {
    currentOverlay() {
      return this.overlays[this.overlays.length - 1]
    }
  },
  methods: {
    displayImage(id) {
      this.currentImage = id
      this.overlays.push('imagePreview')
    }
  }
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

.previewedImage {
  display: block;
  max-width: 100%;
}
</style>
