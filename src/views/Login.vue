<template>
  <overlay @close="$router.push('/')">
    <form @submit.prevent="submit">
      <h2>Login</h2>
      <fieldset>
        <i class="mb-input-icon mdi mdi-email"></i>
        <input class="mb-input mb-input--hasIcon" type="text" placeholder="user@example.com" v-model="email" ref="emailField">
      </fieldset>
      <fieldset>
        <i class="mb-input-icon mdi mdi-lock"></i>
        <input class="mb-input mb-input--hasIcon" type="password" placeholder="••••••••" v-model="password">
      </fieldset>
      <fieldset>
        <button class="mb-button mb-button--primary" action="submit">Go</button>
      </fieldset>
      <router-link to="/register">
        <small class="mb-link">New here? Click to join!</small>
      </router-link>
    </form>
  </overlay>
</template>

<script>
import Overlay from '../components/Overlay.vue'
import * as firebase from 'firebase'

export default {
  components: { Overlay },
  data() {
    return {
      email: '',
      password: '',
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.emailField.focus()
    })
  },
  methods: {
    submit() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .then(() => this.$router.push('/'))
      .catch(err => console.error(err))
    }
  }
}
</script>

<style lang="scss" scoped>
form {
  padding: 1em 0.75em;
}

form, fieldset, h2 {
  text-align: center;
}
</style>
