<template>
  <div>
    <h3>Lockout Macs</h3>
    <locked-mac-instance v-for="item in lockedMac" :key="item.id" :lockout="item" @removed="removed"></locked-mac-instance>
    <router-link to="/lockoutform">Block New Mac</router-link>
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

<style>

</style>
