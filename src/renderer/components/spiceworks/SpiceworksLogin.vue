<template>
  <div class="wrapper">
    <div>
      <h1>Login</h1>
        <form>
          <div>
            <input type="text" placeholder="username" v-model="username">
          </div>
          <div>
            <input type="password" placeholder="password" v-model="password">
          </div>
          <div>
            <button @click="login">Login</button>
          </div>
        </form>
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
        this.$http.post(`http://localhost:8000/spiceworks/`, {
          username: this.username,
          password: this.password
        })
          .then(response => {
            console.log(response)
            this.$store.dispatch('set_session_details', response.data)
            this.$router.push('/ticket')
          })
          .catch(err => console.log(err))
      }
    },
    mounted () {
      if (this.$store.getters.session_details.csrf_token !== null) {
        this.$router.push('/ticket')
      }
      // dummy http call to get around first http call not being received
      console.log('dummy call')
      this.$http.get('http://localhost:8000/api/').then().catch()
    }
  }
</script>

<style>
.wrapper {
  display: flex;
  justify-content: center;
}
</style>
