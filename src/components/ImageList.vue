<template>
  <section class="imageList-container">
    <section class="imageList-list">
      <router-link v-for="id in images" :to="'/image/' + id">
        <image-thumbnail :id="id"></image-thumbnail>
      </router-link>
    </section>
    <!-- <a href='#' class="imageList-loadMore">moar pls!</a> -->
  </section>
</template>

<script>
export default {
  components: {
    ImageThumbnail: require('./ImageThumbnail.vue'),
  },
  props: {
    images: String,
  }
}
</script>

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
