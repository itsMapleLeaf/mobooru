<template>
  <main>
    <section class="container">
      <site-header class="container-item">
        <h2 class="header-title header-item">
          <router-link to="/">mobooru</router-link>
        </h2>
        <input class="mb-input header-item header-item--stretch" placeholder="Search...">
        <button class="mb-button header-item">
          <i class="mdi mdi-magnify"></i>
        </button>

        <template v-if="user">
          <router-link to="/upload" class="mb-button header-item">
            <i class="mdi mdi-upload"></i>
          </router-link>
          <router-link to="/signout" class="mb-button header-item">
            <i class="mdi mdi-logout"></i>
          </router-link>
        </template>

        <template v-else>
          <router-link to="/login" class="mb-button header-item">
            <i class="mdi mdi-login"></i>
          </router-link>
        </template>
      </site-header>
      <image-list class="container-item container-item--stretch" :images='images'></image-list>
    </section>
    <router-view></router-view>
  </main>
</template>

<script>
import * as firebase from 'firebase'
import * as store from '../store'

export default {
  components: {
    ImageList: require('../components/ImageList.vue'),
    ImageThumbnail: require('../components/ImageThumbnail.vue'),
    SiteHeader: require('../components/SiteHeader.vue'),
  },
  data: () => ({
    user: null,
    images: [],
  }),
  async created() {
    firebase.auth().onAuthStateChanged(user => { this.user = user })
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
