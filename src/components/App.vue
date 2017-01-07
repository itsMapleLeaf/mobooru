<template>
  <main>
    <section class="container">
      <SiteHeader class="container-item">
        <h2 class="header-title header-item">
          <router-link to="/">mobooru</router-link>
        </h2>
        <input class="mb-input header-item header-item--stretch" placeholder="Search...">
        <button class="mb-button header-item">
          <i class="mdi mdi-magnify"></i>
        </button>
        <router-link to="/upload" class="mb-button header-item">
          <i class="mdi mdi-upload"></i>
        </router-link>
        <router-link to="/login" v-if="user == null" class="mb-button header-item">
          <i class="mdi mdi-login"></i>
        </router-link>
        <router-link to="/signout" v-if="user" class="mb-button header-item">
          <i class="mdi mdi-logout"></i>
        </router-link>
      </SiteHeader>
      <ImageList class="container-item container-item--stretch">
        <!-- <router-link v-for="image in images" :to="'/image/' + image">
          <ImageThumbnail :id="image"></ImageThumbnail>
        </router-link> -->
      </ImageList>
    </section>
    <router-view></router-view>
  </main>
</template>

<script>
import * as firebase from 'firebase'

export default {
  components: {
    ImageList: require('./ImageList.vue'),
    ImageThumbnail: require('./ImageThumbnail.vue'),
    Overlay: require('./Overlay.vue'),
    SiteHeader: require('./SiteHeader.vue'),
    UploadForm: require('./UploadForm.vue'),
  },
  data() {
    return {
      user: null,
      images: [],
      unsubscribe: null,
    }
  },
  created() {
    this.unsubscribe = firebase.auth().onAuthStateChanged(this.handleAuthState)
  },
  destroyed() {
    this.unsubscribe()
  },
  methods: {
    handleAuthState(user) {
      this.user = user
    },
    fetchImages() {
      window.fetch('/api/list?count=50')
        .then(res => res.json())
        .then(res => { this.images = res.images })
    }
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
