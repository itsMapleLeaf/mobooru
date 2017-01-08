<template>
  <overlay @close="close">
    <template v-if="!uploading">
      <form class="upload-form" @submit.prevent="submit">
        <a href="#" class="upload-dropzone" @click.prevent="openFileMenu" @dragover.prevent="handleDragOver" @drop.prevent="handleDrop">
          <template v-if="imageFiles.length < 1">
            <h1><i class="mdi mdi-upload"></i></h1>
            <h3>Drop files here or click to upload.</h3>
          </template>
          <template v-else>
            <img v-for="src in imageSources" class="upload-preview-image" :src="src">
          </template>
        </a>
        <input type="file" ref="uploadInput" @change="handleInputChange" hidden multiple>
        <button v-if="imageFiles.length > 0" class="upload-submit mb-button mb-button--primary" action="submit">
          Upload
        </button>
      </form>
    </template>
    <template v-else>
      <div class="upload-status">
        <h2>Uploading...</h2>
      </div>
      <div class="upload-statusBar" :style="`transform: scaleX(${uploadProgress})`"></div>
    </template>
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
      imageFiles: [],
      imageSources: [],
      uploading: false,
      uploadProgress: 0,
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
      this.handleFiles(ev.dataTransfer.files)
    },
    handleInputChange(ev) {
      this.handleFiles(ev.target.files)
    },
    async handleFiles(files) {
      for (const file of files) {
        if (store.isImage(file)) {
          this.imageFiles.push(file)
          this.imageSources.push(await store.readImageData(file))
        }
      }
    },
    close() {
      this.$router.push('/')
    },
    async submit() {
      this.uploading = true

      const total = this.imageFiles.length
      for (let i = 0; i < total; i++) {
        const file = this.imageFiles[i]
        await store.uploadImage(file, percent => {
          this.uploadProgress = (i + percent) / total
        })
      }

      this.uploading = false
      this.close()
    }
  }
}
</script>

<style lang="scss">
@import '../styles/mixins';
@import '../styles/colors';

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

.upload-status {
  padding: 1em;
}

.upload-statusBar {
  width: 100%;
  height: 0.2em;
  background-color: $primary;
  transition: 0.3s transform;
}
</style>
