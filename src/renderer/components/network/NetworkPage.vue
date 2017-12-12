<template>
  <div class="mainContainer">
    <h1>NetMummy</h1>
    <p>Watching your network</p>
    <div class="networkContainer">
      <network-vis class="networkMap" v-on:setCurrent="setCurrent($event)"></network-vis>
      <switch-details class="switchDetails" :current-id="activeSwitchId"></switch-details>
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

<style lang="scss" scoped>

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

h1 {
  text-align: center;
  font-family: $heading-font;
}

p {
  text-align: center;
  font-family: $lead-font;
}

</style>
