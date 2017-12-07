<template>
  <div v-if="getActiveUsers" class="chatUsersContainer">
    <h2 class="chatUserTitle">Connected Users</h2>
    <div class="userDetailsFlex">
      <chat-user-details v-for="user in getActiveUsers" :key="user.id" :user="user"></chat-user-details>
    </div>
  </div>
</template>

<script>
import ChatUserDetails from './ChatUserDetails'
import { mapGetters } from 'vuex'

export default {
  components: {
    ChatUserDetails
  },
  computed: {
    ...mapGetters([
      'getActiveUsers'
    ])
  }
}
</script>

<style>

.chatUsersContainer {
  border: 4px solid black;
  border-radius: 8px;
  height: 100vh;
  text-align: center;
}

.userDetailsFlex {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

</style>
