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
  created() {
    store.fetchImageURL(this.$route.params.id)
      .then(url => { this.src = url })
      .catch(err => console.log(err))
  }
}
</script>

<style lang="scss">
img {
  display: block;
  max-width: 100%;
}
</style>
