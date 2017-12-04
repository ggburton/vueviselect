<template>
  <div>
  <h1 class="center">Tick3t List</h1>
    <div>
      <button @click="getMyTickets">My Tickets</button>
      <button @click="getUnassignedTickets">Unassinged</button>
      <button @click="getOpenTickets">Open</button>
    </div>
    <div class="card-list">
      <ticket-card v-for="ticket in tickets" :key="ticket.id" :ticket="ticket"></ticket-card>
    </div>
  </div>
</template>

<script>
import TicketCard from './TicketCard'
import TicketDetail from './TicketDetail'
import WorkTimer from './WorkTimer'

export default {
  data () {
    return {
      tickets: null
    }
  },
  components: {
    TicketCard,
    TicketDetail,
    WorkTimer
  },
  methods: {
    getMyTickets () {
      const server = this.$store.getters.getStore
      this.$http.get(`http://${server}/proxy/tickets.json?filter=open_and_assigned_to_current_user`)
        .then(response => {
          console.log(response)
          this.tickets = response.data
        })
        .catch(err => console.log(err)
        )
    },
    getUnassignedTickets () {
      const server = this.$store.getters.getStore
      this.$http.get(`http://${server}/proxy/tickets.json?filter=unassigned`)
        .then(response => {
          console.log(response.data)
          this.tickets = response.data
        }
        )
        .catch(err => console.log(err)
        )
    },
    getOpenTickets () {
      const server = this.$store.getters.getServer
      this.$http.get(`http://${server}/proxy/tickets.json?filter=open`)
        .then(response => {
          console.log(response)
          this.tickets = response.data
        }
        )
    }
  },
  mounted () {
    const server = this.$store.getters.getServer
    this.$http.get(`http://${server}/proxy/tickets.json?filter=open`)
      .then(response => {
        console.log(response)
        this.tickets = response.data
      })
      .catch(err => console.log(err)
      )
  }
}
</script>

<style>
  .card-list {
    display: flex;
    flex-wrap: wrap;
    align-content: stretch;
    justify-content: space-between;
  }

  .center {
      text-align: center;
  }
</style>
