<template>
  <div class="workon">
    <h5 class="ticketNoLabel">Ticket No</h5>
    <p class="ticketNo">{{$store.state.Spiceworks.ticketTimer.ticket}}</p>
    <h5 class="timeSpentLabel">Time Spent</h5>
    <p class="timeSpent">{{formatTimeElapsed(timespent)}}</p>
    <button class="updateButton" @click="stopWork">Update Ticket</button>
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
      const server = this.$store.getters.getServer
      this.$http.post(`http://${server}/proxy/bbtickets/${ticketid}/labors/`,
        {
          time_spent: Math.floor(this.timespent / 60),
          user_id: this.$store.state.Spiceworks.session_details.user_id
        })
      console.log(this.timespent)
      this.$store.dispatch('stop_work_on_ticket')
      console.log('ticket', ticketid)
      this.$router.push(`/ticket/${ticketid}`)
    }
  }
}
</script>

<style lang="scss">
  .workon {
    display: grid;
    grid-template-rows: repeat(2, 25px);
    grid-template-columns: repeat(10, 1fr);
    bottom: 0;
    right: 0;
    width: 100vw;
    height: 50px;
    border: $thin-border;
    position: fixed;
    text-align: center;
    background-color: $light-color;
    opacity: 0.5;
  }

  .ticketNoLabel {
    grid-row: 1 / span 1;
    grid-column: 1 / span 1;
    margin: 0;
    height: 10px;
  }

  .ticketNo {
    grid-row: 2 / span 1;
    grid-column: 1 / span 1;
    margin: 0;
    height: 10px;
  }

  .timeSpentLabel {
    grid-row: 1 / span 1;
    grid-column: 10 / span 1;
    margin: 0;
    height: 10px;
  }

  .timeSpent {
    grid-row: 2 / span 1;
    grid-column: 10 / span 1;
    margin: 0;
    height: 10px;
  }

  .updateButton {
    grid-row: 1 / span 2;
    grid-column: 4/ span 3;
    margin: 0;
  }

</style>
