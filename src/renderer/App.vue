<template>
  <div id="app">
    <work-timer v-if="$store.getters.worktimer"></work-timer>
    <main-menu></main-menu>
    <router-view></router-view>
  </div>
</template>

<script>
  import MainMenu from './components/common/MainMenu'
  import WorkTimer from './components/spiceworks/WorkTimer'
  export default {
    name: 'vueviselect',
    components: {
      MainMenu,
      WorkTimer
    }
  }
</script>

<style>

#app {
  background-color: #1e1e1e;
}

</style>
