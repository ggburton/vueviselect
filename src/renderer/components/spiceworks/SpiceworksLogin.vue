<template>
  <div class="spiceworksLoginWrapper">
    <h1 class="title">Spiceworks Login</h1>
    <h3 class="subtitle">I need your spiceworks email and password to get your tickets</h3>
    <div class="formContainer">
      <div class="inputElement">
        <span v-if="badLogin" class="errormsg">*wrong login details</span>
        <input type="text" :class="{'error': badLogin}" v-on:input="removeError" placeholder="username" v-model="username">
      </div>
      <div class="inputElement">
        <span v-if="badLogin" class="errormsg">*wrong login details</span>
        <input type="password" :class="{'error': badLogin}" v-on:input="removeError" placeholder="password" v-model="password">
      </div>
      <div>
        <button v-if="!loading" @click="login">Login</button>
        <spinner v-if="loading"></spinner>
      </div>
      <div v-if="badLogin">
        <p class="errormsg">You appear to be having problems logging in.<br>
        <br>
        Should I raise a ticket to get someone to show you<br>
        how to enter a username, password and click a button?</p>
      </div>
    </div>
  </div>
</template>

<script>
  import Spinner from '../common/Spinner.vue'
  export default {
    data () {
      return {
        username: null,
        password: null,
        badLogin: false,
        loading: false
      }
    },
    components: {
      Spinner
    },
    methods: {
      removeError () {
        if (this.badLogin === true) {
          this.badLogin = false
        }
      },
      login () {
        this.loading = true
        const server = this.$store.getters.getServer
        this.$http.post(`http://${server}/spiceworks/`, {
          username: this.username,
          password: this.password
        })
          .then(response => {
            console.log(response)
            this.$store.dispatch('set_session_details', response.data)
            this.$router.push(this.$route.query.redirect)
          })
          .catch(err => {
            console.log(err)
            this.badLogin = true
            this.loading = false
          })
      }
    }
  }
</script>

<style lang="scss">

h1, h3 {
  font-family: $heading-font;
}

.spiceworksLoginWrapper {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(20, auto);
  text-align: center;
  align-items: center;
  border: $thick-border;
  border-radius: 8px;
  padding-bottom: 30px;
  width: 80%;
  margin: 0 auto;
}

.title {
  grid-column: 1 / span 8;
  grid-row: 1 / span 1;
}

.subtitle {
  grid-column: 1 /span 8;
  grid-row: 3/ span 1;
}

.formContainer {
  grid-column: 3 / span 4;
  grid-row: 4 / span 6;
  background-color: $primary-color;
  padding: 20px;
  border: $thin-border;
  border-radius: 8px;
}

.inputElement {
  margin-bottom: 10px;
}

input {
  background-color: white;
  height: 2em;
  font-size: 1em;
}


.error {
  border: 2px solid red;
}

.errormsg {
  color: red;
  font-size: 12px;
}


button {
  @include btn-theme;
}

</style>
