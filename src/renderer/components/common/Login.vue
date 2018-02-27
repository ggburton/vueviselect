<template>
  <div class="adLoginContainer">
    <h1 class="title">Active Directory Login</h1>
    <h3 class="subtitle">needed for backchat and netmap</h3>
    <div class="loginForm">
      <div class="inputElement">
       <span v-if="badLogin" class="errormsg">*wrong login details</span>
       <input :class="{ 'error': badLogin}" v-on:input="removeError" type="text" v-model="username" placeholder="username" />
      </div>
      <div class="inputElement">
        <span v-if="badLogin" class="errormsg">*wrong login details</span>
        <input :class="{ 'error': badLogin}" @keyup.enter="login"  v-on:input="removeError" type="password" v-model="password" placeholder="password" />
      </div>
      <button v-if="!loading" class="inputElement" @click="login">Login</button>
      <spinner v-if="loading"></spinner>
      <div v-if="badLogin">
        <p class="errormsg">You appear to be having problems logging in.
        <br><br>
        Maybe I.T. is not your thing.<br> How about a career using simpler tools<br><br>
        Something with a shovel perhaps?</p>
      </div>
      <div v-if="serveroffline">
        <p class="errormsg">The server is not responding. It may be offline</p>
      </div>
    </div>
  </div>
</template>

<script>
import { corelogin } from '../../api/core'
import { connectSocket } from '../../api/websocket'
import Spinner from './Spinner.vue'
export default {
  data () {
    return {
      username: null,
      password: null,
      badLogin: false,
      loading: false,
      serveroffline: false
    }
  },
  components: {
    Spinner
  },
  methods: {
    removeError () {
      this.badLogin = false
      this.serveroffline = false
    },
    login () {
      this.loading = true
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
        .catch(err => {
          this.loading = false
          if (err.response) {
            if (err.response.status === 400) {
              this.badLogin = true
            } else if (err.response.status === 500) {
              console.log(err.response.status)
              console.log('could not access the server')
            }
          } else if (err.request) {
            console.log(err.request)
            this.serveroffline = true
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>

.adLoginContainer {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(20, auto);
  text-align: center;
  align-items: center;
  border: $thick-border;
  border-radius: 8px;
  padding-bottom: 50px;
  width: 80%;
  margin: 0 auto;
}

.title {
  grid-column: 3 / span 4;
  grid-row: 1 / span 1;
}

.subtitle {
  grid-column: 3 / span 4;
  grid-row: 3 / span 1;
}

.loginForm {
  grid-column: 3 / span 4;
  grid-row: 4 / span 6;
  background-color: $primary-color;
  padding: 20px;
  border: 1px solid black;
  border-radius: 8px;
}

.error {
  border: 2px solid red;
}

.errormsg {
  color: red;
  font-size: 12px;
}

.inputElement {
  margin-bottom: 10px;
}

input {
  background-color: white;
  height: 2em;
  font-size: 1em;
}

button {
  @include btn-theme;
}
</style>
