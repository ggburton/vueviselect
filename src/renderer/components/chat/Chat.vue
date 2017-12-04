<template>
  <div>
    <h1>Chatbox</h1>
    <chat-users></chat-users>
    <button @click="sendMessage">Send</button>
    <button @click="getUsers">Get Users</button>
  </div>
</template>

<script>
import { webSocketBridge } from '../../api/websocket'
import ChatUsers from './ChatUsers'
export default {
  mounted () {
    webSocketBridge.demultiplex('chat', (response) => {
      if (response.type === 'getUsers') {
        this.$store.dispatch('set_active_users', response.users)
      } else if (response.type === 'message') {
        this.$store.dispatch('append_message', response)
      }
    })
  },
  components: {
    ChatUsers
  },
  methods: {
    sendMessage () {
      webSocketBridge.stream('chat').send({
        'content': {
          'type': 'message',
          'text': 'this is a test'
        }
      })
    },
    getUsers () {
      webSocketBridge.stream('chat').send({
        'content': {
          'type': 'getUsers'
        }
      })
    }
  }
}
</script>

<style lang="css">

</style>
