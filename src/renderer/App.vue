<template>
  <div id="app">
    <work-timer v-if="$store.state.Spiceworks.worktimer"></work-timer>
    <router-view></router-view>
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
  width: 800px;
}

</style>
