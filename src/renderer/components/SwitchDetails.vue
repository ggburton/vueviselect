<template>
  <div v-if="wSwitch" class="data-grid">
    <h1>{{ wSwitch.name }}</h1>
    <table>
      <tr>
        <td>IP Address</td>
        <td>{{wSwitch.ipAddress}}</td>
      </tr>
      <tr>
        <td>Parent Switch</td>
        <td>{{wSwitch.parent}}</td>
      </tr>
        <td>Last Ping</td>
        <td>{{wSwitch.lastOnline.startOf('second').fromNow()}}</td>
    </table>
  </div>
</template>

<script>
export default {
  props: ['currentId'],
  data () {
    return {
      wSwitch: null
    }
  },
  watch: {
    currentId: function (newVal, oldVal) {
      const url = `http://172.16.5.253:8000/api/switch/${this.currentId}/`
      this.$http.get(url).then(result => {
        const lastOnline = this.$moment(result.lastOnline)
        console.log(lastOnline)
        this.wSwitch = result.data
        this.wSwitch.lastOnline = lastOnline
      }).catch(err => {
        console.error(err)
      })
    }
  }

}
</script>

<style>

.data-grid {
  width: 400px;
}

h1 {
  text-align: center;
}

</style>
