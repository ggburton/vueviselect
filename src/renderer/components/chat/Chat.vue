<template>
  <div>
    <h1>Chatbox</h1>
    <chat-users></chat-users>
    <chat-window></chat-window>
  </div>
</template>

<script>
import { webSocketBridge } from '../../api/websocket'
import ChatWindow from './ChatWindow'
import ChatUsers from './ChatUsers'

export default {
  mounted () {
    console.log('chat mounted')
    webSocketBridge.demultiplex('chat', (response) => {
      if (response.type === 'getUsers') {
        console.log('got', response)
        this.$store.dispatch('set_active_users', response.users)
      } else if (response.type === 'message') {
        this.$store.dispatch('append_message', response)
      }
    })
    webSocketBridge.stream('chat').send({
      'content': {
        'type': 'getUsers'
      }
    })
  },
  components: {
    ChatUsers,
    ChatWindow
  }
}
</script>

<style lang="css">

</style>
