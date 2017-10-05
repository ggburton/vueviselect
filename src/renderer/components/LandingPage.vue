<template>
  <div id="wrapper">
    <network-vis></network-vis>
  </div>
</template>

<script>
  import NetworkVis from './NetworkVis.vue'
  export default {
    name: 'landing-page',
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    },
    components: {
      NetworkVis
    }
  }
</script>

<style>

  #wrapper {
    background-color: black;
  }

</style>
