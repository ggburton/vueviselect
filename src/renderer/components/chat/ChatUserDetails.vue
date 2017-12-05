<template>
  <div v-if="user">
    <h3>{{user.username}}</h3>
    <p>{{user.first_name}}</p>
    <p>{{user.last_name}}</p>
    <img :src="buildurl()" />
  </div>
</template>

<script>
export default {
  props: ['user'],
  methods: {
    buildurl () {
      return `http://${this.$store.getters.getServer}${this.user.photo}`
    }
  }
}
</script>

<style>

</style>
