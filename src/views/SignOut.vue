<template>
  <overlay @close="$router.push('/')">
    <form @submit.prevent>
      <fieldset>
        <p>Are you sure you want to sign out?</p>
      </fieldset>
      <fieldset>
        <button class="mb-button mb-button--success" @click="signOut">Sign Out</button>
        <button class="mb-button mb-button--error" @click="$router.push('/')">Cancel</button>
      </fieldset>
    </form>
  </overlay>
</template>

<script>
import Overlay from '../components/Overlay.vue'
import * as store from '../store'

export default {
  components: {Overlay},
  methods: {
    signOut() {
      store.signOut().then(() => this.$router.push('/'))
    }
  }
}
</script>

<style lang="scss" scoped>
form, fieldset {
  text-align: center;
}
</style>
