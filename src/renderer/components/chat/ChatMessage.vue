<template>
  <div class="messageContainer" v-if="user">
    <div class="imageBox">
      <chat-user-photo :photourl="this.user.photo"></chat-user-photo>
    </div>
    <div class="messageText">{{message.text}}</div>
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
  grid-template-rows: repeat(2, auto);
  grid-template-columns: repeat(10, auto);
  border: 1px solid black;
}

.image-box {
  grid-row: 1 / span 2;
  grid-column: 1 / span 1;
  background-color: red;
}

</style>
