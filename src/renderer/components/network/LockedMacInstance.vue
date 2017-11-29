<template>
  <div>
    <h3>Locked Mac instance</h3>
    <div>{{lockout.mac}}</div>
    <div>{{lockout.lockedTime}}</div>
    <div>{{lockout.reason}}</div>
    <button @click="remove">Remove</button>
  </div>
</template>

<script>
export default {
  props: ['lockout'],
  methods: {
    remove () {
      this.$emit('removed', this.lockout.id)
    }
  }
}
</script>

<style>

</style>
