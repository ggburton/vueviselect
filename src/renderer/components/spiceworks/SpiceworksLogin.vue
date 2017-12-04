<template>
  <div class="wrapper">
    <div>
      <h1>Login</h1>
          <div>
            <input type="text" placeholder="username" v-model="username">
          </div>
          <div>
            <input type="password" placeholder="password" v-model="password">
          </div>
          <div>
            <button @click="login">Login</button>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'landing-page',
    data () {
      return {
        username: null,
        password: null
      }
    },
    methods: {
      login () {
        const server = this.$store.getters.getServer
        this.$http.post(`http://${server}/spiceworks/`, {
          username: this.username,
          password: this.password
        })
          .then(response => {
            console.log(response)
            this.$store.dispatch('set_session_details', response.data)
            this.$router.push('/tickets')
          })
          .catch(err => console.log(err))
      }
    },
    mounted () {
      if (this.$store.getters.session_details.csrf_token !== null) {
        this.$router.push('/tickets')
      }
    }
  }
</script>

<style>
.wrapper {
  display: flex;
  justify-content: center;
}
</style>
