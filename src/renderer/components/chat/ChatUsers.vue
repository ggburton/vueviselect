<template>
  <div v-if="getActiveUsers">
    <chat-user-details v-for="user in getActiveUsers" :key="user.id" :user="user"></chat-user-details>
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

</style>
