<template>
  <div class="messageContainer" v-if="user">
    <div class="imageBox">
      <chat-user-photo :photourl="this.user.photo"></chat-user-photo>
    </div>
    <div class="messageText"><p>{{message.text}}</p></div>
  </div>
</template>

<script>
import ChatUserPhoto from './ChatUserPhoto'
export default {
  data () {
    return {
      user: null,
      profile_url: null
    }
  },
  props: ['message'],
  components: {
    ChatUserPhoto
  },
  mounted () {
    this.user = this.$store.getters.getActiveUsers.find(user => user.username === this.message.user)
  }
}
</script>

<style>


.messageContainer {
  display: grid;
  grid-template-rows: repeat(2, 50%);
  grid-template-columns: repeat(8, 12.5%);
  border: 1px solid black;
  border-radius: 2px 8px 8px 2px;
  margin: 5px 5px 5px 5px;
  align-self: auto;
}

.image-box {
  grid-row: 1 / span 2;
  grid-column: 1 / span 1;
  background-color: red;
  height: 100%;
}

.messageText {
  grid-row: 1 / span 2;
  grid-column: 2 / span 7;
}

p {
  margin-top: 10px;
}

</style>
