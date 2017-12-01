<template>
  <div>
    <h1>Chatbox</h1>
    <button @click="sendMessage">Send</button>
  </div>
</template>

<script>
import { webSocketBridge } from '../../api/websocket'
export default {
  mounted () {
    webSocketBridge.demultiplex('chat', (response) => {
      console.log(response)
    })
  },
  methods: {
    sendMessage () {
      webSocketBridge.stream('chat').send({content: 'This is a test'})
    }
  }
}
</script>

<style lang="css">

</style>
