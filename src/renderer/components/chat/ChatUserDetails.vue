<template>
  <div v-if="user" class="chatUserDetailsContainer">
    <div class="userPhoto">
      <chat-user-photo :photourl="user.photo"></chat-user-photo>
    </div>
     <div class="userDetails">
      <h3>{{user.first_name}}</h3>
    </div>
  </div>
</template>

<script>
import ChatUserPhoto from './ChatUserPhoto'
export default {
  props: ['user'],
  components: {
    ChatUserPhoto
  }
}
</script>

<style lang="scss" scoped>
.chatUserDetailsContainer {
  margin: 5px 5px;
  display: flex;
  border: $thin-border;
  border-radius: 2px 8px 8px 2px;
  width: 80%;
}

.userPhoto {
  border-radius: 8px;
}

.userDetails {
  margin-left: 10px;
}

p {
  margin: 0px;
}

h3 {
  font-family: $heading-font;
}
</style>
