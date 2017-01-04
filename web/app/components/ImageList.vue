<template>
  <section class="imageList"></section>
</template>

<style lang='scss' scoped>
@import '../styles/mixins';

.imageList {
  padding: 0.5em;
  overflow-y: auto;
  @include flex(row, center, flex-start, wrap);
  align-content: flex-start;
}

.image {
  display: inline-block;
  width: 15em;
  height: 15em;
  margin: 0.5em;
  background-size: cover;
  background-position-x: center;
  box-shadow: 0 0.1em 0.3em #aaa;
}
</style>
