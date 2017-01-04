<template>
  <main class="mb-siteContainer">
    <SiteHeader></SiteHeader>
    <ImageList></ImageList>
  </main>
</template>

<script>
import SiteHeader from './Header.vue'
import ImageList from './ImageList.vue'

export default {
  components: { SiteHeader, ImageList }
}
</script>
