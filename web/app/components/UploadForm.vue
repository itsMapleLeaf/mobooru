<template>
  <form class="upload-form">
    <input type="file" class="upload-input">
    <div class="upload-dropzone">
      <h3>Drop files here or click to upload.</h3>
    </div>
    <button class="mb-button mb-button--primary" @click.prevent>Upload</button>
  </form>
</template>

<style lang='scss' scoped>
@import '../styles/mixins';

.upload-form {
  text-align: center;
}

.upload-input {
  display: none;
}

.upload-dropzone {
  @include flex;

  // width: 12em;
  height: 10em;
  padding: 1em;
  // border: 2px dotted #ddd;
  // background: #ddd;
  color: rgb(180, 180, 180);

  h3 {
    font-weight: 400;
  }

  margin-bottom: 0.6em;
}
</style>
