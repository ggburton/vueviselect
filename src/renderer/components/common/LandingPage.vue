<template>
  <div class="container">

    <div class="heading">
      <h1>&#128435; Help Desk Friend</h1>
      <p class="lead">Helping you help your users</p>
    </div>

    <div class="app" id="netmummy" @click="goto('/network')">
        <h3>NetMummy</h3>
        <h1 class="icon">&#128423;</h1>
        <p class="lead">A mini version of imc with just the important bits</p>
    </div>

    <div class="app" id="ticketoff" @click="goto('/tickets')">
      <h3>Ticket Off</h3>
      <h1 class="icon">&#127915;</h1>
      <p class="lead">A simple interface to manage and monitor your spiceworks tickets.</p>

    </div>

    <div class="app" id="backchat" @click="goto('/chat')">
      <h3>BackChat</h3>
      <h1 class="icon">📢</h1>
      <p class="lead"><span class="quote">If only we had a desktop chat application for "work"</span><br><br>...well now you do!</p>
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

</style>
