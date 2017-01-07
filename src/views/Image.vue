<template>
  <overlay @close="$router.push('/')">
    <img :src="src" @click="$router.push('/')">
  </overlay>
</template>

<script>
import * as store from '../store'

export default {
  components: {
    Overlay: require('../components/Overlay.vue'),
  },
  data() {
    return {
      src: ''
    }
  },
  async created() {
    this.src = await store.fetchImageURL(this.$route.params.id)
  }
}
</script>

<style lang="scss">
img {
  display: block;
  max-width: 100%;
}
</style>
