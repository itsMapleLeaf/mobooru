<template>
  <section class="imageList-container">
    <section class="imageList-list">
      <slot></slot>
    </section>
    <a href='#' class="imageList-loadMore">moar pls!</a>
  </section>
</template>

<style lang="scss" scoped>
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

.imageList-loadMore {
  display: block;
  text-align: center;
  padding: 0.75em;
  background: #ddd;
}
</style>
