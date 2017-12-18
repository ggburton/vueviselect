<template>
  <div class="lockedMacInstanceContainer">
    <div id="blockedBy">{{lockout.lockedBy}}</div>
    <div id="blockedMac">{{lockout.mac}}</div>
    <div id="blockedTime">{{formatTime(lockout.lockedTime)}}</div>
    <div id="blockedReason">{{lockout.reason}}</div>
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
    border: $thin-border;
    border-radius: 2px;
    display: grid;
    grid-template-rows: repeat(2, auto);
    grid-template-columns: repeat(12, 1fr);
    grid-row-gap: 8px;
    grid-auto-flow: row;
    padding: 8px;
  }

  #blockedBy {
    grid-row: 2 / span 1;
    grid-column: 1 / span 2;
  }

  #blockedMac {
    grid-row: 2 / span 1;
    grid-column: 3 /span 3;
  }

  #blockedTime {
    grid-row: 2 / span 1;
    grid-column: 6 / span 3;
  }

  #blockedReason {
    grid-row: 2 / span 1;
    grid-column: 9 / span 3;
  }

  button {
    grid-row: 2 /span 1;
    grid-column: 12 /span 1;
    @include btn-theme;
  }


</style>
