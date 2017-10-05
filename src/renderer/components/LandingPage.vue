<template>
  <div id="wrapper">
    <div class="container">
      <network-vis v-on:setCurrent="setCurrent($event)"></network-vis>
      <switch-details :current-id="activeSwitchId"></switch-details>
    </div>
  </div>
</template>

<script>
  import NetworkVis from './NetworkVis.vue'
  import SwitchDetails from './SwitchDetails.vue'

  export default {
    name: 'landing-page',
    data () {
      return {
        activeSwitchId: null
      }
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      setCurrent (event) {
        this.activeSwitchId = event
      }
    },
    components: {
      NetworkVis,
      SwitchDetails
    }
  }
</script>

<style>

 .container {
   display: flex;
 }

</style>
