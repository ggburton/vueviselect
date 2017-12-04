<template>
  <div>
    <div>
      <input type="text" v-model="username" placeholder="username" />
    </div>
    <div>
      <input type="password" v-model="password" placeholder="password" />
    </div>
    <button @click="login">Login</button>
  </div>
</template>

<script>
import { corelogin } from '../../api/core'
import { connectSocket } from '../../api/websocket'
export default {
  data () {
    return {
      username: null,
      password: null
    }
  },
  methods: {
    login () {
      const payload = {
        'username': this.username,
        'password': this.password
      }
      const server = this.$store.getters.getServer
      corelogin(this.username, this.password) // get a JWT
      this.$http.post(`http://${server}/session-login/`, payload)
        .then(response => {
          if (response.status === 200) {
            this.$http.get(`http://${server}/get-session/`)
              .then(response => {
                this.$store.dispatch('set_session_key', response.data)
                connectSocket()
              })
          }
        })
    }
  }
}
</script>

<style>

</style>
