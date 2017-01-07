<template>
  <a href='#' class="thumbnail" :style="`background-image: url(${src})`"></a>
</template>

<script>
import * as firebase from 'firebase'

export default {
  props: {
    id: String,
  },
  data() {
    return {
      src: '',
    }
  },
  mounted() {
    firebase.database().ref('image/' + this.id).once('value')
    .then(data => firebase.storage().ref(data.val()).getDownloadURL())
    .then(url => { this.src = url })
    .catch(err => console.log(err))
  }
}
</script>

<style lang="scss" scoped>
.thumbnail {
  display: inline-block;
  width: 15em;
  height: 15em;
  margin: 0.5em;
  background-size: cover;
  background-position: top center;
  box-shadow: 0 0.1em 0.3em #aaa;
}
</style>
