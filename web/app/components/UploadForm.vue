<template>
  <form class="upload-form">
    <div class="upload-dropzone" @dragenter.prevent @dragleave.prevent @dragover.prevent="handleDragOver" @drop.prevent="handleDrop">
      <h3 v-if="!currentImage">Drop files here or click to upload.</h3>
      <img v-else class="upload-preview-image" :src="currentImage.src">
    </div>
    <input type="file" class="upload-input">
    <button class="mb-button mb-button--primary" @click.prevent="upload">Upload</button>
  </form>
</template>

<script>
function isImage(file) {
  return /^image\//.test(file.type)
}

function readImageData(file) {
  const reader = new window.FileReader()
  reader.readAsDataURL(file)
  return new Promise((resolve, reject) => {
    reader.onload = ev => resolve(ev.target.result)
    reader.onerror = reject
  })
}

export default {
  data() {
    return {
      currentImage: null
    }
  },
  methods: {
    handleDragOver(ev) {
      ev.dataTransfer.dropEffect = 'copy'
    },
    handleDrop(ev) {
      const file = ev.dataTransfer.files[0]
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
        .then(data => data.error ? Promise.reject(data.error) : console.log(data))
        .catch(err => console.error(err))
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../styles/mixins';

.upload-form {
  text-align: center;
  padding: 1em;
}

.upload-input {
  display: none;
}

.upload-dropzone {
  @include flex(column);

  // width: 12em;
  min-height: 10em;
  // padding: 1em;
  // border: 2px dotted #ddd;
  // background: #ddd;
  color: rgb(180, 180, 180);

  h3 {
    font-weight: 400;
  }

  margin-bottom: 0.6em;
}

.upload-preview-image {
  width: 100%;
  margin: 0.5em;
}
</style>
