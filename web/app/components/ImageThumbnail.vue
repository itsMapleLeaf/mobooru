<template>
  <a href='#' class="thumbnail" :style="`background-image: url(/api/thumb/${id})`"></a>
</template>

<script>
export default {
  props: {
    id: String,
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
