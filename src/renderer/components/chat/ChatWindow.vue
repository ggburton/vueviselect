<template>
  <div class="chatWindowContainer">
    <chat-message v-for="message in $store.getters.getMessages" :key="message.text" :message="message"></chat-message>
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
  height: 100vh;
}

textarea {
  width: 99%;
  outline: none;
  resize: none;
}

.textEntryDiv {
  margin-bottom: 5px;
  align-self: bottom;
}

</style>
