<template>
  <div class="spiceworksLoginWrapper">
    <h1 class="title">Spiceworks Login</h1>
    <h3 class="subtitle">Please provide you spiceworks email and password to continue</h3>
    <div class="formContainer">
      <div class="inputElement">
        <input type="text" placeholder="username" v-model="username">
      </div>
      <div class="inputElement">
        <input type="password" placeholder="password" v-model="password">
      </div>
      <div>
        <button @click="login">Login</button>
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

@font-face {
  font-family: Barlow-MediumItalic;
  src: url('../../assets/Barlow-MediumItalic.ttf');
}

.spiceworksLoginWrapper {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(20, 5vh);
  text-align: center;
  align-items: center;
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
  background-color: #efefef;
  padding: 20px;
  border: 1px solid black;
  border-radius: 8px;
}

.inputElement {
  margin-bottom: 10px;
}

input {
  font-family: Barlow-MediumItalic;
}

</style>
