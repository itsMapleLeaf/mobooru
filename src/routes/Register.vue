<template>
  <overlay @close="$router.push('/')">
    <form @submit.prevent="submit">
      <fieldset>
        <h2>Register</h2>
      </fieldset>
      <fieldset>
        <i class="mb-input-icon mdi mdi-email"></i>
        <input class="mb-input mb-input--hasIcon" type="text" placeholder="user@example.com" v-model="email" ref="emailField">
      </fieldset>
      <fieldset>
        <i class="mb-input-icon mdi mdi-lock"></i>
        <input class="mb-input mb-input--hasIcon" type="password" placeholder="••••••••" v-model="password">
      </fieldset>
      <fieldset>
        <i class="mb-input-icon mdi mdi-lock"></i>
        <input class="mb-input mb-input--hasIcon" type="password" placeholder="•••••••• (again)" v-model="passwordAgain">
      </fieldset>
      <fieldset>
        <button class="mb-button mb-button--primary" action="submit">Create Account</button>
      </fieldset>
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
      passwordAgain: '',
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.emailField.focus()
    })
  },
  methods: {
    submit() {
      if (this.password === this.passwordAgain) {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then(() => this.$router.push('/'))
        .catch(error => console.error(error))
      }
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
