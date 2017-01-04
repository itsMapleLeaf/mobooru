<template>
  <section class="imageList">
    <a href='#' class="imageList-image" v-for="id in images" :style="`background-image: url(/api/image/${id})`">
    </a>
  </section>
</template>

<script>
export default {
  data() {
    return { images: [] }
  },
  mounted() {
    window.fetch('/api/images')
      .then(res => res.json())
      .then(res => { this.images = res.images })
  }
}
</script>

<style lang='scss' scoped>
@import '../styles/mixins';

.imageList {
  padding: 0.5em;
  overflow-y: auto;
  @include flex(row, center, flex-start, wrap);
  align-content: flex-start;
}

.imageList-image {
  display: inline-block;
  width: 15em;
  height: 15em;
  margin: 0.5em;
  background-size: cover;
  background-position-x: center;
  box-shadow: 0 0.1em 0.3em #aaa;
}
</style>
