<template>
  <div class="networkContainer">
    <network-vis class="networkMap" v-on:setCurrent="setCurrent($event)"></network-vis>
    <switch-details class="switchDetails" :current-id="activeSwitchId"></switch-details>
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
.networkContainer {
  display: flex;
}

.networkMap {
  flex-grow: 1;
}

.switchDetails {
  flex-grow: 1;
  width: 100%;
}

</style>
