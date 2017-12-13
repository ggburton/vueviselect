<template>
  <div class="container">

    <div class="app" @click="goto('/network')">
        NetMummy
    </div>

    <div class="app" @click="goto('/tickets')">
      Ticket Off
    </div>

    <div class="app" @click="goto('/chat')">
      BackChat
    </div>

  </div>
</template>

<script>
export default {
  methods: {
    goto (link) {
      console.log(link)
    }
  }
}
</script>


<style>
.container {
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: space-around;
  height: 90vh;
}

.app {
  border: 1px solid black;
  flex-basis: 30%;
  text-align: center;
  height: 50vh;
}


</style>
