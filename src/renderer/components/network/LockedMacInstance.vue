<template>
  <div class="lockedMacInstanceContainer">
    <div class="item one">{{lockout.lockedBy}}</div>
    <div class="item two">{{lockout.mac}}</div>
    <div class="item two">{{formatTime(lockout.lockedTime)}}</div>
    <div class="item two">{{lockout.reason}}</div>
    <button @click="remove">UnBlock</button>
  </div>
</template>

<script>
export default {
  props: ['lockout'],
  methods: {
    remove () {
      this.$emit('removed', this.lockout.id)
    },
    formatTime (time) {
      return this.$moment(time).format('hh:mmA DD/MM/YY')
    }
  }
}
</script>

<style lang="scss" scoped>

  .lockedMacInstanceContainer {
    margin: 10px;
    border: $thin-border;
    border-radius: 2px;
    display: flex;
    padding: 8px;
    justify-content: space-around;
    align-items: center;
  }

  .one {
    width: 10%;
  }

  .two {
    width: 22%;
  }

  button {
    width: 10%;
    text-align: center;
  }

</style>
