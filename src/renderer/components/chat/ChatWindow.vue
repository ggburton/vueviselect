<template>
  <div class="chatWindowContainer">
    <div>
      <chat-message v-for="message in $store.getters.getMessages" :key="message.text" :message="message"></chat-message>
    </div>
    <div>
      <textarea class="testarea" cols="30" rows="10" v-model="draftMessage"></textarea>
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

</style>
