<template>
  <form class="upload-form">
    <div class="upload-dropzone" @dragenter.prevent @dragleave.prevent @dragover.prevent="handleDragOver" @drop.prevent="handleDrop">
      <h3 v-if="images.length < 1">Drop files here or click to upload.</h3>
      <template v-else>
        <img class="upload-preview-image" v-for="src in images" :src="src">
      </template>
    </div>
    <input type="file" class="upload-input">
    <button class="mb-button mb-button--primary" @click.prevent>Upload</button>
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
      images: []
    }
  },
  methods: {
    handleDragOver(ev) {
      ev.dataTransfer.dropEffect = 'copy'
    },
    handleDrop(ev) {
      for (const file of ev.dataTransfer.files) {
        if (isImage(file)) {
          readImageData(file)
            .then(src => this.images.push(src))
            .catch(err => console.error(err))
        }
      }
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../styles/mixins';

.upload-form {
  text-align: center;
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
