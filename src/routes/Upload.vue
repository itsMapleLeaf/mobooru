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
import * as firebase from 'firebase'
import * as crypto from 'crypto'
import * as path from 'path'

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

function generateImageID() {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(16, (err, buf) => {
      err ? reject(err) : resolve(buf.toString('hex'))
    })
  })
}

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
    setImage(file) {
      if (isImage(file)) {
        readImageData(file)
          .then(src => {
            this.imageFile = file
            this.imageSource = src
          })
          .catch(err => console.error(err))
      }
    },
    close() {
      this.$router.push('/')
    },
    submit() {
      generateImageID()
      .then(id => {
        const extension = path.extname(this.imageFile.name)
        const filename = id + extension
        const upload = firebase.storage().ref().child('images/' + filename)
        return upload.put(this.imageFile)
          .then(() => firebase.database().ref('images').push(id))
          .then(() => firebase.database().ref('image/' + id).set(upload.fullPath))
      })
      .then(() => this.close())
      .catch(err => console.error(err))
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
