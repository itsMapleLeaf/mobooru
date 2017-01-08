<template>
  <main>
    <section class="container">
      <site-header class="container-item"></site-header>
      <image-list class="container-item container-item--stretch" :images='images'></image-list>
    </section>
    <router-view></router-view>
  </main>
</template>

<script>
import * as store from '../store'

export default {
  components: {
    Icon: require('../components/Icon.vue'),
    ImageList: require('../components/ImageList.vue'),
    ImageThumbnail: require('../components/ImageThumbnail.vue'),
    SiteHeader: require('../components/SiteHeader.vue'),
  },
  data: () => ({
    images: [],
  }),
  async created() {
    this.images = await store.fetchImageList()
  }
}
</script>

<style lang="scss" scoped>
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
