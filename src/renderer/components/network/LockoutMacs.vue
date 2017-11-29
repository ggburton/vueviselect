<template>
  <div>
    <h3>Lockout Macs</h3>
    <locked-mac-instance v-for="item in lockedMac" :key="item.id" :lockout="item" @removed="removed"></locked-mac-instance>
    <div>add lockout mac form here</div>
  </div>
</template>

<script>
import LockedMacInstance from './LockedMacInstance'

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
      this.$client.action(this.$store.getters.getSchema, ['lockoutMac', 'list'])
        .then(response => {
          response.forEach(item => {
            this.lockedMac.push(item)
          })
        })
    },
    removed (data) {
      console.log('removed', data)
      const params = {'id': data}
      this.$client.action(this.$store.getters.getSchema, ['lockoutMac', 'delete'], params)
        .then(this.getmacs())
    }
  },
  mounted () {
    this.getmacs()
  }

}
</script>

<style>

</style>
