<template>
  <div class="mainContainer">
    <h1>&#128506; NetMap</h1>
    <div class="navigationButtons">
     <router-link class="lockoutButton" to="/networkLanding"><button>NetMummy Main</button></router-link>
     <router-link class="lockoutButton" to="/landing"><button>Home</button></router-link>
    </div>
    <div class="networkContainer">
      <network-vis class="networkMap" v-on:setCurrent="setCurrent($event)"></network-vis>
      <transition name="fade" mode="out-in">
        <switch-details class="switchDetails" :current="activeSwitchId" :key="activeSwitchId"></switch-details>
      </transition>
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

.navigationButtons {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin-bottom: 10px;
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

.fade-enter-active, .fade-leave-active {
  transition: opacity .2s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

 button {
    @include btn-theme;
  }
</style>
