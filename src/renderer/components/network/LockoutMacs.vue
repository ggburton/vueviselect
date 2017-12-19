<template>
  <div class="lockoutContainer">
    <h1>&#128423; NetMummy</h1>
    <div class="currentLockouts">
      <h3>Lockout Macs</h3>
      <div ng-if="lockedMac">
        <div class="lockedMacInstanceHeading">
          <div class="label one">Blocked By:</div>
          <div class="label two">Blocked Address:</div>
          <div class="label two">Time Blocked:</div>
          <div class="label two">Blocked reason:</div>
          <div class="label one">Action:</div>
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
    margin: 0 auto;
    text-align: center;
    width: 80%;
    border: $thick-border;
    border-radius: 8px;
    padding: 50px 10px;
  }

  .lockedMacInstanceHeading {
    display: flex;
    justify-content: space-around;
    width: 95%;
    margin: 0 auto;
  }

  .label {
    font-weight: bold;
  }

   .one {
    width: 10%;
  }

  .two {
    width: 22%;
  }

  button {
    @include btn-theme;
  }

</style>
