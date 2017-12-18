<template>
  <div class="lockoutContainer">
    <h1>&#128423; NetMummy</h1>
    <div class="currentLockouts">
      <h3>Lockout Macs</h3>
      <div ng-if="lockedMac">
        <div class="lockedMacInstanceHeading">
          <div id="blockedByLabel">Blocked By:</div>
          <div id="blockedMacLabel">Blocked Address:</div>
          <div id="blockedTimeLabel">Time Blocked:</div>
          <div id="blockedReasonLabel">Blocked reason:</div>
        </div>
        <locked-mac-instance v-for="item in lockedMac" :key="item.id" :lockout="item" @removed="removed"></locked-mac-instance>
      </div>
      <div ng-else>There are no blocked macs at the moment</div>
    </div>
    <router-link to="/lockoutform"><button>Block New Mac</button></router-link>
  </div>
</template>

<script>
import LockedMacInstance from './LockedMacInstance'
import { useClient } from '../../api/core'

export default {
  data () {
    return {
      lockedMac: []
    }
  },
  components: {
    LockedMacInstance
  },
  methods: {
    getmacs () {
      this.lockedMac = []
      useClient(['lockoutMac', 'list'])
        .then(response => {
          console.log(response)
          response.forEach(item => {
            this.lockedMac.push(item)
          })
        })
        .catch(err => console.error(err))
    },
    removed (data) {
      const action = ['lockoutMac', 'delete']
      const params = {'id': data}
      useClient(action, params)
        .then(response => {
          console.log(response)
          this.getmacs()
        })
    }
  },
  mounted () {
    this.getmacs()
  }

}
</script>

<style lang="scss" scoped>

  .lockoutContainer {
    text-align: center;
    border: $thick-border;
    border-radius: 8px;
    width: 80%;
    margin: 0 auto;
    padding: 50px 5px;
  }

  .currentLockouts {
    margin: 30px;
  }

  .lockedMacInstanceHeading {
    grid-template-rows: repeat(2, auto);
    grid-template-columns: repeat(12, 1fr);
  }

  #blockedByLabel {
    grid-row: 1 / span 2;
    grid-column: 1 / span 2;
  }

  #blockedMacLabel {
    grid-row: 1 / span 2;
    grid-column: 3 / span 3;
  }

  #blockedTimeLabel {
    grid-row: 1 /span 2;
    grid-column: 6 / span 3;
  }

  #blockedReasonLabel {
    grid-row: 1 / span 2;
    grid-column: 9 / span 3;
  }


  button {
    @include btn-theme;
  }

</style>
