<template>
  <div class="chatContainer">
    <h1 class="chatHeading">📢 BackChat</h1>
    <chat-users class="chatUsers"></chat-users>
    <chat-window class="chatWindow"></chat-window>
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

<style lang="scss" scoped>
.chatContainer {
  display: grid;
  grid-template-columns: repeat(10, 10%);
  grid-template-rows: repeat(10, 10%);
  grid-column-gap: 8px;
}

.chatHeading {
  grid-row: 1 / span 1;
  grid-column: 1 /span 10;
  text-align: center;
  font-family: $heading-font;
}

.chatUsers {
  grid-column: 1 / span 3;
  grid-row: 2 / span 10;
}

.chatWindow {
  grid-column: 4 / span 6;
  grid-row: 2 / span 1;
  border: $thick-border;
  border-radius: 8px;
}

</style>
