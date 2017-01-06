<template>
  <overlay @close="$router.push('/')">
    <img :src="`/api/image/${$route.params.image}`" @click="$router.push('/')">
  </overlay>
</template>

<script>
export default {
  components: {
    Overlay: require('../components/Overlay.vue'),
  }
}
</script>

<style lang="scss">
img {
  display: block;
  max-width: 100%;
}
</style>
