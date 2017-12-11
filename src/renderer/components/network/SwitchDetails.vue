<template>
  <div v-if="wSwitch" class="data-grid">

    <div class="heading">
      <h1>{{ wSwitch.name }}</h1>
    </div>

    <div class="label">IP Address</div>
    <div class="data">{{ wSwitch.ipAddress }}</div>

    <div class="label">Parent Switch</div>
    <div class="data">{{ wSwitch.parent }}</div>

    <div class="label">Last Ping</div>
    <div class="data">{{ lastPingTime }}</div>

    <div class="label">Location</div>
    <div class="data">{{ wSwitch.location }}</div>

    <div class="label">Uptime</div>
    <div class="data">{{ switchUptime }}</div>

  </div>
</template>

<script>
import { useClient } from '../../api/core'
export default {
  props: ['currentId'],
  data () {
    return {
      wSwitch: null,
      uptime: null
    }
  },
  computed: {
    lastPingTime () {
      return this.$moment(this.wSwitch.lastPing).fromNow()
    },
    switchUptime () {
      return this.$moment.duration(this.wSwitch.uptime + this.uptime).format('Y [years] M [months] D [days] HH:mm:ss')
    }
  },
  watch: {
    currentId: function (newVal, oldVal) {
      const action = ['switch', 'read']
      const params = {id: this.currentId}
      useClient(action, params)
        .then(data => { this.wSwitch = data })
        .catch(err => console.log('Opps: ', err))
    }
  },
  mounted () {
    setInterval(() => {
      this.uptime += 1000
    }, 1000)
  }

}
</script>

<style>
.data-grid {
  display: grid;
  grid-template-rows: repeat(6, auto);
  grid-template-columns: repeat(2, 1fr);
  grid-auto-flow: column;
  grid-row-gap: 5px;
  border: 3px solid black;
  border-radius: 8px;
  margin-left: 8px;
}

.heading {
  grid-column: 1 / -1;
  grid-row: 1/ span 1;
  width: 100%;
  background-color: #d8d8d8;
  text-align: center;
}

.label {
  grid-column: 1 / span 1;
  font-size: 1.3em;
  font-weight: bold;
  margin-left: 8px;
}

.data {
  grid-column: 2 / span 1;
  font-size: 1.2em;
  font-weight: bold;
}

.address {
  grid-row: 2 /span 1;
}

</style>
