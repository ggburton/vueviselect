<template>
  <div>
    <h3>Lockout mac form</h3>
    <form v-on:submit.prevent="onSubmit">
      <div>
        <input type="text" v-model="mac" pattern="([0-9A-Fa-f]{2})[:-]{5}[0-9A-Fa-f]{2})" placeholder="12:34:56:78:ab:ef"/>
      </div>
      <div>
        <textarea type="text" v-model="reason" placeholder="reason"></textarea>
      </div>
      <div>
        <router-link to="/lockoutmacs">Cancel</router-link>
        <button type="submit">Block!</button>
      </div>
    </form>
  </div>
</template>

<script>
import { useClient } from '../../api/core'
export default {
  data () {
    return {
      mac: null,
      reason: null
    }
  },
  methods: {
    onSubmit () {
      const action = ['lockoutMac', 'create']
      const payload = {
        'mac': this.mac,
        'reason': this.reason
      }
      useClient(action, payload)
        .then(response => {
          console.log(response)
          this.$router.push('/lockoutmacs')
        })
    }
  }
}
</script>

<style>

</style>
