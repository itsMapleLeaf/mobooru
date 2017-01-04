<template>
  <section class="uploadOverlay mb-overlay" :class="{ 'mb-overlay--visible': visible }" @click="$emit('closed')">
    <div class="mb-overlay-panel">
      <form class="uploadOverlay-form">
        <input type="file" class="uploadOverlay-input">
        <div class="uploadOverlay-dropzone">
          <h3>Drop files here or click to upload.</h3>
        </div>
        <button class="mb-button mb-button--primary uploadOverlay-submitButton">Upload</button>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    visible: Boolean,
  }
}
</script>

<style lang='scss' scoped>
@import '../styles/mixins';

.uploadOverlay {}

.uploadOverlay-form {
  text-align: center;
}

.uploadOverlay-input {
  display: none;
}

.uploadOverlay-dropzone {
  @include flex;

  width: 12em;
  height: 10em;
  // border: 2px dotted #ddd;
  // background: #ddd;
  color: rgb(180, 180, 180);

  h3 {
    font-weight: 400;
  }

  margin-bottom: 0.6em;
}
</style>
