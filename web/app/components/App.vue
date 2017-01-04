<template>
  <div>
    <main class="container">
      <site-header class="container-item"></site-header>
      <image-list class="container-item container-item--stretch"></image-list>
    </main>
    <upload-overlay></upload-overlay>
  </div>
</template>

<script>
import SiteHeader from './SiteHeader.vue'
import ImageList from './ImageList.vue'
import UploadOverlay from './UploadOverlay.vue'

export default {
  components: {
    SiteHeader,
    ImageList,
    UploadOverlay,
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

.mb-overlay {
  @include fullscreen;
  @include flex(column);

  background-color: rgba(0, 0, 0, 0.5);

  opacity: 0;
  visibility: hidden;
  transition: 0.3s;

  overflow-y: auto;
}

.mb-overlay-panel {
  width: max-content;
  height: max-content;
  max-width: calc(100vw - 2em);
  max-height: calc(100vh - 2em);
  background-color: white;
  box-shadow: 0 0.1em 0.3em rgba(0, 0, 0, 0.3);
  padding: 0.3em 0.6em;

  transition: 0.3s transform ease-in;
  transform: translateY(-2em);
}

.mb-overlay--visible {
  opacity: 1;
  visibility: visible;

  .mb-overlay-panel {
    transition-timing-function: ease-out;
    transform: translateY(0);
  }
}
</style>
