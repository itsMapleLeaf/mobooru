<template>
  <form class="upload-form">
    <a href="#" class="upload-dropzone" @click.prevent="openFileMenu" @dragover.prevent="handleDragOver" @drop.prevent="handleDrop" @dragenter.prevent @dragleave.prevent>
      <template v-if="!currentImage">
        <h1><i class="mdi mdi-upload"></i></h1>
        <h3>Drop files here or click to upload.</h3>
      </template>
      <transition v-else name="fade">
        <img class="upload-preview-image" :src="currentImage.src">
      </transition>
    </a>
    <input type="file" ref="uploadInput" hidden @change="setImage($event.target.files[0])">
    <button v-if="currentImage" class="upload-submit mb-button mb-button--primary" @click.prevent="upload">Upload</button>
  </form>
</template>

<script>
function isImage(file) {
  return /^image\//.test(file.type)
}

function readImageData(file) {
  return new Promise((resolve, reject) => {
    const reader = new window.FileReader()
    reader.onload = ev => resolve(ev.target.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export default {
  data() {
    return {
      currentImage: null
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
    setImage(file) {
      if (isImage(file)) {
        readImageData(file)
          .then(src => { this.currentImage = {file, src} })
          .catch(err => console.error(err))
      }
    },
    upload() {
      const body = new window.FormData()
      body.append('image', this.currentImage.file)

      window.fetch('/api/upload', { method: 'POST', body })
        .then(res => res.json())
        .then(data => data.error ? Promise.reject(data.error) : data)
        .then(data => this.$emit('upload-success', data.name))
        .catch(err => console.error(err))
    }
  }
}
</script>

<style lang="scss" scoped>
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
