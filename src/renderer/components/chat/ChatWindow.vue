<template>
  <div class="chatWindowContainer">
    <div class="messages">
      <chat-message class="center" v-for="message in $store.getters.getMessages" :key="message.text" :message="message"></chat-message>
    </div>
    <div class="textEntryDiv">
      <textarea autofocus @keyup.enter="send" class="testarea" rows="5" v-model="draftMessage"></textarea>
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
  updated () {
    const messagebox = this.$el.children[0]
    messagebox.scrollTop = messagebox.scrollHeight
  },
  methods: {
    send () {
      if (this.draftMessage !== null) {
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
  height: 80vh;
}

.center {
  border: 2px solid red;
}

.messages {
  grid-row: 1 / span 9;
  grid-column: 1 / span 8;
  overflow: scroll;
}

textarea {
  min-width: 90%;
  outline: none;
  resize: none;
}

.textEntryDiv {
  grid-row: 10 / span 1;
  grid-column: 1 / span 8;
  margin: 8px;
  display: flex;

}
</style>
