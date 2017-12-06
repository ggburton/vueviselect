<template>
  <div v-if="user" class="chatUserDetailsContainer">
    <div class="userDetails">
      <h3>{{user.first_name}} {{user.last_name}}</h3>
    </div>
    <div class="userPhoto">
      <chat-user-photo :photourl="user.photo"></chat-user-photo>
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

<style>
.chatUserDetailsContainer {
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-template-rows: repeat(5, auto)
}

.userPhoto {
  grid-column: 1 / span 1;
  grid-row: 1 / span 3;
}

.userDetails {
  grid-column: 2 / span 4;
  grid-row: 1 / span 3;
}

p {
  margin: 0px;
}
</style>
