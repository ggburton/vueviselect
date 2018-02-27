<template>
  <div class="container">

    <div class="heading">
      <h1>&#128423; NetMummy</h1>
      <p>Spoonfeeding you your network needs</p>
       <router-link class="lockoutButton" to="/landing"><button>Main Menu</button></router-link>
    </div>

    <div class="app" id="netmummy" @click="goto('/network')">
        <h3>NetMap</h3>
        <h1 class="icon">&#128506;</h1>
        <p class="lead">The logical layout of your network</p>
    </div>

    <div class="app" id="ticketoff" @click="goto('/lockoutMacs')">
      <h3>McBlock</h3>
      <h1 class="icon">&#128721;</h1>
      <p class="lead">View, Block and Unblock macs from ALL of your switches</p>

    </div>

    <div class="app" id="backchat" @click="goto('/findDevice')">
      <h3>SearchDog</h3>
      <h1 class="icon">&#128021;</h1>
      <p class="lead">Searchdog will find what switch and port any connected IP address is on</p>
    </div>

  </div>
</template>

<script>
export default {
  methods: {
    goto (link) {
      console.log(link)
      this.$router.push(link)
    }
  }
}
</script>

<style lang="scss" scoped>

h1, h3 {
  font-family: $heading-font;
}

h1 {
  line-height: 100%;
}

.container {
  display: grid;
  grid-template-rows: repeat(4, auto);
  grid-template-columns: repeat(6, 1fr);
  grid-row-gap: 50px;
  justify-content: center;
  justify-items: center;
  align-items: center;
}

.app {
  border: $thick-border;
  border-radius: 8px;
  text-align: center;
  height: 50vh;
  width: 25vw;
  &:hover {
    background-color: $primary-color;
  }
}

.heading {
  grid-column: 1 / span 6;
  grid-row: 1 / span 1;
  border: $thick-border;
  border-radius: 8px;
  text-align: center;
  height: 150px;
  width: 95%;
  padding-bottom: 10px;
}

#netmummy {
  grid-column: 1 / span 2;
  grid-row: 2/ span 1;
}

#ticketoff {
  grid-column: 3 / span 2;
  grid-row: 2 / span 1;
}

#backchat {
  grid-column: 5 / span 2;
  grid-row: 2/ span 1;
}

.quote {
  font-style: italic;
}

.lead {
  font-weight: bold;
  margin: 10px;
}

button {
    @include btn-theme;
}

</style>
