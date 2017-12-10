<template>
  <div class="adLoginContainer">
    <h1 class="title">Active Directory Login</h1>
    <h3 class="subtitle">needed for backchat and netmap</h3>
    <div class="loginForm">
      <div class="inputElement">
       <input type="text" v-model="username" placeholder="username" />
      </div>
      <div class="inputElement">
        <input type="password" v-model="password" placeholder="password" />
      </div>
      <button class="inputElement" @click="login">Login</button>
    </div>
  </div>
</template>

<script>
import { corelogin } from '../../api/core'
import { connectSocket } from '../../api/websocket'
export default {
  data () {
    return {
      username: 'gburton',
      password: 'testtesttest'
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
                  .then(() => this.$router.push(this.$route.query.redirect))
              })
          }
        })
    }
  }
}
</script>

<style>
.adLoginContainer {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(20, 5vh);
  text-align: center;
  align-items: center;
}

.title {
  grid-column: 1 / 8;
  grid-row: 1 / span 1;
}

.subtitle {
  grid-column: 1 / 8;
  grid-row: 3 / span 1;
}

.loginForm {
  grid-column: 3 / span 3;
  grid-row: 4 / span 6;
  background-color: #efefef;
  padding: 10px;
  border: 1px solid black;
  border-radius: 8px;

}

.inputElement {
  margin-bottom: 10px;
}

input {
  background-color: white;
  height: 2em;
}
</style>
