<template>
  <div class="workon">
    <h4>working on {{$store.state.Spiceworks.ticketTimer.ticket}}</h4>
    <p>time spent: {{formatTimeElapsed(timespent)}}</p>
    <button @click="stopWork">Stop</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      timespent: null
    }
  },
  mounted () {
    this.timespent = 0
    setInterval(() => {
      this.timespent++
    }, 1000)
  },
  methods: {
    formatTimeElapsed (seconds) {
      if (this.timespent !== null) {
        return this.$moment().startOf('day').seconds(seconds).format('H:mm:ss')
      }
    },
    stopWork () {
      const ticketid = this.$store.state.Spiceworks.ticketTimer.ticket
      // divide time by 60 then update call to
      // bbtickets/{{ticket.id}}/labors
      // { time_spent: mins, user_id: "my_id" }
      this.$http.post(`http://localhost:8000/proxy/bbtickets/${ticketid}/labors/`,
        {
          time_spent: Math.floor(this.timespent / 60),
          user_id: this.$store.state.Spiceworks.session_details.user_id
        })
      console.log(this.timespent)
      this.$store.dispatch('stop_work_on_ticket')
    }
  }
}
</script>

<style>
  .workon {
    position: absolute;
    top: 0;
    right: 0;
  }
</style>
