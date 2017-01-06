<template>
  <main>
    <section class="container">
      <SiteHeader class="container-item">
        <h2 class="header-title header-item">
          <a href="/">mobooru</a>
        </h2>
        <input class="mb-input header-item header-item--stretch" placeholder="Search...">
        <button class="mb-button header-item">
          <i class="mdi mdi-magnify"></i>
        </button>
        <button class="mb-button header-item" @click="overlays.push({ name: 'upload' })">
          <i class="mdi mdi-upload"></i>
        </button>
      </SiteHeader>
      <ImageList class="container-item container-item--stretch">
        <ImageThumbnail v-for="id in images" :id="id" @click.native.prevent="displayImage(id)">
        </ImageThumbnail>
      </ImageList>
    </section>
    <Overlay v-for="overlay in overlays" @close="overlays.pop()">
      <template v-if="overlay.name === 'imagePreview'">
        <img class="previewedImage" :src="`/api/image/${overlay.image}/full`" @click="overlays.pop()">
      </template>
      <template v-if="overlay.name === 'upload'">
        <UploadForm @upload-success="handleUploadSuccess"></UploadForm>
      </template>
    </Overlay>
  </main>
</template>

<script>
import ImageList from '../components/ImageList.vue'
import ImageThumbnail from '../components/ImageThumbnail.vue'
import Overlay from '../components/Overlay.vue'
import SiteHeader from '../components/SiteHeader.vue'
import UploadForm from '../components/UploadForm.vue'

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
    this.fetchImages()
  },
  computed: {
    currentOverlay() {
      return this.overlays[this.overlays.length - 1]
    }
  },
  methods: {
    displayImage(image) {
      this.overlays.push({ name: 'imagePreview', image })
    },
    handleUploadSuccess(image) {
      this.overlays.pop()
      this.displayImage(image)
    },
    fetchImages() {
      window.fetch('/api/list?count=50')
        .then(res => res.json())
        .then(res => { this.images = res.images })
    }
  }
}
</script>

<style lang="scss" scoped>
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
