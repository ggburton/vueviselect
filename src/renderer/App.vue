<template>
  <div id="app">
    <work-timer v-if="$store.state.Spiceworks.worktimer"></work-timer>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import WorkTimer from './components/spiceworks/WorkTimer'
  export default {
    name: 'vueviselect',
    components: {
      WorkTimer
    },
    mounted () {
      this.$electron.ipcRenderer.on('route', (event, data) => {
        console.log('data', data)
        this.$router.push(data.route)
      })
    }
  }
</script>

<style>

#app {
  height: 100vh;
  width: 90vw;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}
</style>
