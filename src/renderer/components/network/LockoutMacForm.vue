<template>
  <div class="lockoutMacFormContainer">
    <h3>Lockout mac form</h3>
    <form v-on:submit.prevent="onSubmit">
      <div>
        <input class="macField" @keyup="echo" type="text" v-model="mac" pattern="([0-9A-Fa-f]{2})[:-]{5}[0-9A-Fa-f]{2})" placeholder="12:34:56:78:ab:ef"/>
      </div>
      <div>
        <textarea class="textAreaField" cols="3" rows="5" type="text" v-model="reason" placeholder="reason"></textarea>
      </div>
      <div>
        <router-link to="/lockoutmacs"><button>Cancel</button></router-link>
        <button type="submit">Block!</button>
      </div>
    </form>
  </div>
</template>

<script>
import { useClient } from '../../api/core'
// import Cleave from 'cleave.js'

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
    },
    echo () {
      console.log(this.mac)
    }
  }
}
</script>

<style lang="scss" scoped>

  .lockoutMacFormContainer {
    border: $thick-border;
    border-radius: 8px;
    width: 80%;
    margin: 0 auto;
    text-align: center;
    padding: 50px 10px;
  }

  form {
    background-color: $primary-color;
    border: $thin-border;
    border-radius: 3px;
    width: 50%;
    margin: 0 auto;
    padding: 20px;
  }

  .macField {
    background-color: white;
    height: 2em;
    font-size: 1em;
    margin-bottom: 10px;
  }

  .textAreaField {
    background-color: white;
    height: 2em;
    font-size: 1.2em;
    width: 80%;
    height: 50px;
    resize: none;
    outline: none;
    margin-bottom: 5px;
  }

  button {
    @include btn-theme;
  }

</style>
