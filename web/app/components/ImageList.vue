<template>
  <section class="imageList-container">
    <section class="imageList-list">
      <a href='#' class="imageList-image" v-for="id in images" :style="`background-image: url(/api/image/${id})`"></a>
    </section>
    <a href='#' class="imageList-loadMore">moar pls!</a>
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

.imageList-container {
  @include flex(column, center, stretch);
}

.imageList-list {
  @include flex(row, center, flex-start, wrap);
  flex-grow: 1;
  padding: 0.5em;
  overflow-y: auto;
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

.imageList-loadMore {
  display: block;
  text-align: center;
  padding: 0.75em;
  background: #ddd;
}
</style>
