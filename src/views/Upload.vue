<template>
  <overlay @close="close">
    <form class="upload-form" @submit.prevent="submit">
      <a href="#" class="upload-dropzone" @click.prevent="openFileMenu" @dragover.prevent="handleDragOver" @drop.prevent="handleDrop" @dragenter.prevent @dragleave.prevent>
        <template v-if="!imageSource">
          <h1><i class="mdi mdi-upload"></i></h1>
          <h3>Drop files here or click to upload.</h3>
        </template>
        <img v-else class="upload-preview-image" :src="imageSource">
      </a>
      <input type="file" ref="uploadInput" hidden @change="setImage($event.target.files[0])">
      <button v-if="imageSource" class="upload-submit mb-button mb-button--primary" action="submit">Upload</button>
    </form>
  </overlay>
</template>

<script>
import * as store from '../store'

export default {
  components: {
    Overlay: require('../components/Overlay.vue'),
  },
  data() {
    return {
      imageSource: '',
      imageFile: null,
    }
  },
  methods: {
    openFileMenu() {
      this.$refs.uploadInput.click()
    },
    handleDragOver(ev) {
      ev.dataTransfer.dropEffect = 'copy'
    },
    handleDrop(ev) {
      this.setImage(ev.dataTransfer.files[0])
    },
    async setImage(file) {
      if (store.isImage(file)) {
        this.imageSource = await store.readImageData(file)
        this.imageFile = file
      }
    },
    close() {
      this.$router.push('/')
    },
    async submit() {
      const id = await store.uploadImage(this.imageFile)
      this.$router.push('/image/' + id)
    }
  }
}
</script>

<style lang="scss">
@import '../styles/mixins';

.upload-form {
  text-align: center;
  padding: 1em;
}

.upload-dropzone {
  @include flex(column);

  min-height: 10em;
  color: rgb(180, 180, 180);

  h3 {
    font-weight: 400;
  }
}

.upload-preview-image {
  width: 100%;
  max-width: 20em;
}

.upload-submit {
  margin-top: 1em;
}
</style>
