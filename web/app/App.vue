<template>
  <div>
    <SiteContainer></SiteContainer>
    <UploadOverlay></UploadOverlay>
  </div>
</template>

<script>
import SiteContainer from './SiteContainer.vue'
import UploadOverlay from './UploadOverlay.vue'

export default {
  components: {
    SiteContainer,
    UploadOverlay,
  }
}
</script>
