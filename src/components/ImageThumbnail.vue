<template>
  <a href='#' class="thumbnail" :style="`background-image: url(${src})`"></a>
</template>

<script>
import * as store from '../store'

export default {
  props: {
    id: String,
  },
  data() {
    return {
      src: '',
    }
  },
  async created() {
    this.src = await store.fetchImageURL(this.id)
  }
}
</script>

<style lang="scss" scoped>
.thumbnail {
  display: inline-block;
  width: 15em;
  height: 15em;
  margin: 0.5em;
  background-size: cover;
  background-position: top center;
  box-shadow: 0 0.1em 0.3em #aaa;
}
</style>
