<template>
  <header class="header">
    <h2 class="header-title header-item">
      <router-link to="/">mobooru</router-link>
    </h2>
    <input class="mb-input header-item header-item--stretch" placeholder="Search...">
    <button class="mb-button header-item">
      <icon>magnify</icon>
    </button>

    <template v-if="user">
      <router-link to="/upload" class="mb-button header-item">
        <icon>upload</icon>
        <span class="header-item-label">Upload</span>
      </router-link>
      <router-link to="/signout" class="mb-button header-item">
        <icon>logout</icon>
        <span class="header-item-label">Sign Out</span>
      </router-link>
    </template>

    <template v-else>
      <router-link to="/login" class="mb-button header-item">
        <icon>login</icon>
        <span class="header-item-label">Sign In</span>
      </router-link>
    </template>
  </header>
</template>

<script>
import * as firebase from 'firebase'

export default {
  components: {
    Icon: require('../components/Icon.vue'),
  },
  data() {
    return { user: null }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => { this.user = user })
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/mixins';

.header {
  @include flex(row);

  padding: 0.3em;
  background-color: white;
  box-shadow: 0 0.1em 0.2em #aaa;

  position: -webkit-sticky;
  position: sticky;
  top: 0;

  height: max-content;
}

.header-item {
  margin-left: 0.2em;
  margin-right: 0.2em;
}

.header-item--stretch {
  width: 0;
  flex-grow: 1;
}

.header-title {
  @media (max-width: 480px) {
    display: none;
  }
}

.header-item-label {
  @media (max-width: 800px) {
    display: none;
  }
}
</style>
