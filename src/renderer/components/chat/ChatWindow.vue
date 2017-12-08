<template>
  <div class="chatWindowContainer">
    <div class="messages">
      <chat-message v-for="message in $store.getters.getMessages" :key="message.text" :message="message"></chat-message>
    </div>
    <div class="textEntryDiv">
      <textarea autofocus class="testarea" rows="5" v-model="draftMessage"></textarea>
      <button @click="send">Send</button>
    </div>
  </div>
</template>

<script>
import ChatMessage from './ChatMessage'
import { webSocketBridge } from '../../api/websocket'
export default {
  data () {
    return {
      draftMessage: null
    }
  },
  components: {
    ChatMessage
  },
  methods: {
    send () {
      if (this.draftMessage !== null) {
        console.log('sending')
        webSocketBridge.stream('chat').send({
          'content': {
            'type': 'message',
            'text': this.draftMessage
          }
        })
        this.draftMessage = null
      }
    }
  }
}
</script>

<style>
.chatWindowContainer {
  display: grid;
  grid-template-rows: repeat(10, 10%);
  grid-template-columns: repeat(8, 12.5%);
  height: 100vh;
}

.messages {
  grid-row: 1 / span 9;
  grid-column: 1 / span 8;
}

textarea {
  min-width: 90%;
  outline: none;
  resize: none;
}

.textEntryDiv {
  grid-row: 10 / span 1;
  grid-column: 1 / span 8;
  margin-bottom: 5px;
  display: flex;
}
</style>
