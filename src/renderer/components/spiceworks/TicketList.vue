<template>
  <div class="ticketListContainer">
    <div class="titleDiv">
      <h1 class="title">&#127915; Ticket Off</h1>
    </div>
    <div class="menuButtons">
      <button @click="getMyTickets">My Tickets</button>
      <button @click="getUnassignedTickets">Unassinged</button>
      <button @click="getOpenTickets">Open</button>
    </div>
    <div v-if="!loading" class="cardListContainer">
      <ticket-card class="ticket" v-for="ticket in tickets" :key="ticket.id" :ticket="ticket"></ticket-card>
    </div>
    <spinner v-if="loading"></spinner>
  </div>
</template>

<script>
import TicketCard from './TicketCard'
import TicketDetail from './TicketDetail'
import WorkTimer from './WorkTimer'
import Spinner from '../common/Spinner'

export default {
  data () {
    return {
      tickets: null,
      server: null,
      loading: false
    }
  },
  components: {
    TicketCard,
    TicketDetail,
    WorkTimer,
    Spinner
  },
  methods: {
    getMyTickets () {
      this.loading = true
      this.$http.get(`http://${this.server}/proxy/tickets.json?filter=open_and_assigned_to_current_user`)
        .then(response => {
          console.log(response)
          this.tickets = response.data
          this.loading = false
        })
        .catch(err => console.log(err)
        )
    },
    getUnassignedTickets () {
      this.loading = true
      this.$http.get(`http://${this.server}/proxy/tickets.json?filter=unassigned`)
        .then(response => {
          console.log(response.data)
          this.tickets = response.data
          this.loading = false
        }
        )
        .catch(err => console.log(err)
        )
    },
    getOpenTickets () {
      this.loading = true
      this.$http.get(`http://${this.server}/proxy/tickets.json?filter=open`)
        .then(response => {
          console.log(response)
          this.tickets = response.data
          this.loading = false
        }
        )
    }
  },
  mounted () {
    this.loading = true
    this.server = this.$store.getters.getServer
    this.$http.get(`http://${this.server}/proxy/tickets.json?filter=open`)
      .then(response => {
        console.log(response)
        this.tickets = response.data
        this.loading = false
      })
      .catch(err => console.log(err)
      )
  }
}
</script>

<style lang="scss" scoped>

.ticketListContainer {
  display: flex;
  flex-direction: column;
  text-align: center;
  align-content: center;
}

.cardListContainer {
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  justify-content: center;
}

.ticket {
  margin: 10px 10px;
}

.titleDiv {
  width: 500px;
  font-family: $heading-font;
  align-self: center;
}

button {
  @include btn-theme;
}

</style>
