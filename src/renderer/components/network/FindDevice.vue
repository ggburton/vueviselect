<template>
  <div class="lockoutMacFormContainer">
    <h1>&#128021; SearchDog</h1>
    <h3>Find Device</h3>
    <form v-on:submit.prevent="onSubmit">
      <div>
        <input class="macField" @keyup:enter="onSubmit" @focus="notFound=false" type="text" v-model="ip" ref="ipinput"/>
      </div>
      <div>
        <button type="submit">Find!</button>
        <router-link to="/networkLanding"><button>Cancel</button></router-link>
      </div>
      <spinner v-if="loading"></spinner>
    </form>
    
    <div v-if="results" class="data-grid">
      <div class="heading">
        <h3>Found {{ results.ipAddress }}</h3>
      </div>

      <div class="data-row">
        <div class="label">MAC Address</div>
        <div class="data">{{ results.macAddress }}</div>
      </div>

      <div class="data-row">
        <div class="label">Switch</div>
        <div class="data">{{ results.location.switch}}</div>
      </div>

      <div class="data-row">
        <div class="label">Port</div>
        <div class="data">{{ results.location.port }}</div>
      </div>
    </div>
    
    <div v-if="notFound">
      <p>The specified address is not responding to pings</p>
    </div>
  </div>
</template>

<script>
import { useClient } from '../../api/core'
import Inputmask from 'inputmask'
import Spinner from '../common/Spinner'

export default {
  data () {
    return {
      ip: null,
      results: null,
      loading: false,
      notFound: false
    }
  },
  components: {
    Spinner
  },
  mounted () {
    var inputmask = new Inputmask('ip')
    inputmask.mask(this.$refs.ipinput)
  },
  methods: {
    onSubmit () {
      this.loading = true
      const action = ['findDevice', 'update']
      const payload = {
        'ip': this.ip
      }
      useClient(action, payload)
        .then(response => {
          console.log(response)
          this.results = response
          this.loading = false
        })
        .catch(() => {
          this.loading = false
          this.notFound = true
          console.log('address not found')
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

  form .results{
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

  @font-face {
  font-family: Barlow-Medium;
  src: url('../../assets/Barlow-Medium.ttf');
}

@font-face {
  font-family: Barlow-Black;
  src: url('../../assets/Barlow-Black.ttf');
}

.data-grid {
  display: flex;
  flex-direction: column;
  border: 3px solid black;
  border-radius: 8px;
  margin-left: 8px;
  margin-top: 20px;
  flex-grow: 1;
}

.location {
  flex-basis: 1;
}

.heading {
  width: 100%;
  background-color: #d8d8d8;
  text-align: center;
  margin-bottom: 10px;
}

.data-row {
  display: flex;
  justify-content: space-between;
  padding: 5px;
}

.label {
  width: 50%;
  margin-left: 8px;
  font-family: Barlow-Black;
}

.data {
  width: 50%;
  font-family: Barow-Medium;
}

</style>