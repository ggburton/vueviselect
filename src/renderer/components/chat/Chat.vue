<template>
  <div>
    <h1>Chatbox</h1>
    <button @click="sendMessage">Send</button>
  </div>
</template>

<script>
export default {
  mounted () {
    console.log('mounted')
    this.$bridge.demultiplex('chat', (response) => {
      console.log(response.data)
    })
  },
  methods: {
    sendMessage () {
      this.$bridge.stream('chat').send({content: 'This is a test'})
    }
  }
}
</script>

<style lang="css">

</style>
