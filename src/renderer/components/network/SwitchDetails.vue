<template>
  <div v-if="wSwitch" class="data-grid">
    <div class="heading">
      <h1>{{ wSwitch.name }}</h1>
    </div>

    <div class="data-row">
      <div class="label">IP Address</div>
      <div class="data">{{ wSwitch.ipAddress }}</div>
    </div>

    <div class="data-row">
      <div class="label">Parent Switch</div>
      <div class="data">{{ wSwitch.parent }}</div>
    </div>

    <div class="data-row">
      <div class="label">Last Ping</div>
      <div class="data">{{ lastPingTime }}</div>
    </div>

    <div class="data-row location">
      <div class="label">Location</div>
      <div class="data">{{ wSwitch.location }}</div>
    </div>

    <div class="data-row">
      <div class="label">Uptime</div>
      <div class="data">{{ switchUptime }}</div>
    </div>
  </div>
</template>

<script>
import { useClient } from '../../api/core'
export default {
  props: ['current'],
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
  mounted () {
    if (this.current !== null) {
      const action = ['switch', 'read']
      const params = {id: this.current}
      useClient(action, params)
        .then(data => { this.wSwitch = data })
        .catch(err => console.log('Opps: ', err))
    }
    setInterval(() => {
      this.uptime += 1000
    }, 1000)
  }
}
</script>

<style lang="scss" scoped>
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
