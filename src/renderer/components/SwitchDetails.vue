<template>
  <div v-if="wSwitch" class="data-grid">
    <div class="panel">
      <div class="panel-header">
        <h1>{{ wSwitch.name }}</h1>
      </div>
    <div class="flex-h">
      <table>
        <tr>
          <td>IP Address</td>
          <td>{{ wSwitch.ipAddress }}</td>
        </tr>
        <tr>
          <td>Parent Switch</td>
          <td>{{ wSwitch.parent }}</td>
        </tr>
        <tr>
          <td>Last Ping</td>
          <td>{{ lastPingTime }}</td>
        </tr>
        <tr>
          <td>Location</td>
          <td>{{ wSwitch.location }}</td>
        </tr>
        <tr>
          <td>Uptime</td>
          <td>{{ switchUptime }}</td>
        </tr>
      </table>
    </div>
    </div>
  </div>
</template>

<script>
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
      this.$client.action(this.$store.state.Schema.schema, ['switch', 'read'], {id: this.currentId})
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

.panel {
  background-color: #333333;
  border-radius: 5px;
  margin: 5px 5px;
}


.data-grid {
  width: 400px;
  display: flex;
  flex-direction: column;
  align-content: center;
  color: white;
}

.flex-h {
  display: flex;
  justify-content: center;
  background-color: #1c1a1a;

}

table {
   margin-top: 10px;
   width: 90%;
   border-collapse: collapse;
   font-size: 20px;
}

tr {
  padding: 30px;
}

td {
  padding-left: 15px;
  border-collapse: collapse;
}

h1 {
  text-align: center;
}

</style>
