<template>
  <div v-if="ticket" class="detail-container">

    <router-link class="backButton" to="/tickets" tag="button">Back</router-link>
    <button v-if="!$store.getters.getCurrentTicket" class="workonButton" @click="workon">Workon Ticket</button>
    <h1>Ticket Details</h1>

    <div class="summary dataDiv">
      <h4>Summary</h4>
      {{ticket.summary}}
    </div>

    <div class="metaData dataDiv">
      <h4 class="heading">Status</h4>
      <div class="created-label label" >Created</div>
      <div class="created data">{{formatTime(ticket.created_at)}}</div>

      <div class="created-by-label label">Created By</div>
      <div class="created-by data">{{ticket.created_by}}</div>

      <div class="status-label label">Status</div>
      <div class="status data">{{ticket.status}}</div>

      <div class="time-spent-label label">Time Spent</div>
      <div class="time-spent data">{{ticket.time_spent_duration}}</div>

      <div class="updated-at-label label">Last Updated</div>
      <div class="updated-at data">{{timeSince(ticket.updated_at)}}</div>

      <div class="due-at-label label">Due At</div>
      <div class="due-at data">{{ticket.due_at}}</div>
    </div>

    <div class="description dataDiv">
      <h4>Details</h4>
      <div class="description">{{stripHtml(ticket.description)}}</div>
    </div>
    <div class="updateTicket dataDiv">
      <ticket-update-form :ticket="ticket"></ticket-update-form>
    </div>
    <div class="comments dataDiv">
      <h4>Comments</h4>
      <ticket-comment v-for="comment in ticket.comments" :key="comment.updated_at" :comment="comment"></ticket-comment>
    </div>
  </div>
</template>

<script>
import TicketComment from './TicketComment'
import TicketUpdateForm from './TicketUpdateForm'
export default {
  data () {
    return {
      ticket: null
    }
  },
  components: {
    TicketComment,
    TicketUpdateForm
  },
  methods: {
    stripHtml (string) {
      return string.replace(/<[^>]+>/g, '')
    },
    updateTicket () {
      const server = this.$store.getters.getServer
      console.log('update ticket called')
      this.$http.get(`http://${server}/proxy/bbtickets/${this.$route.params.id}/`)
        .then(response => {
          console.log(response.data)
          this.ticket = response.data
        })
        .catch(err => console.log(err))
    },
    workon () {
      const payload = {
        ticket: this.ticket.id,
        startTime: this.$moment.now()
      }
      this.$store.dispatch('work_on_ticket', payload)
    },
    formatTime (time) {
      return this.$moment(time).format('hh:mmA DD/MM/YY')
    },
    timeSince (time) {
      return this.$moment(time).fromNow()
    }
  },
  mounted () {
    this.updateTicket()
  }
}
</script>


<style lang="scss" scoped>

  h1 {
    text-align: center;
    grid-row: 1 / span 1;
    grid-column: 1 / -1;
  }

 .detail-container {
   display: grid;
   grid-auto-flow: column;
   grid-row-gap: 15px;
   grid-template-columns: repeat(12, 1fr);
   grid-template-rows: repeat(20, auto);
   align-items: center;
   width: 80%;
   margin: 0 auto;
   // background-color: #d8d8d8;
   border: 3px solid $highlight-color;
   border-radius: 8px;
   padding-top: 10px;
 }

  .backButton {
    position: fixed;
    top: 50px;
    left: 3px;
    height: 50px;
    width: 9vw;
    font-weight: bold;
  }

  .workonButton {
   position: fixed;
   top: 105px;
   left: 3px;
   height: 50px;
   width: 9vw;
   font-weight: bold;
  }

  .summary {
    grid-column: 2 / span 10;
    grid-row: 2 / span 1;
    padding-bottom: 10px;
  }

  .dataDiv {
    background-color: #eeeded;
    border: 1px solid #979797;
    border-radius: 5px;
    padding: 10px 10px;
  }

  h4 {
    text-align: center;
    margin-top: 0px;
  }

  .metaData {
    grid-column: 2 / span 10;
    grid-row: 3 / span 1;
    grid-row-gap: 8px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(6, auto);
    grid-auto-flow: column;
  }

  .heading {
    grid-column: 1 / span 10;
  }

  .label {
    grid-column: 1 / span 1;
  }

  .data {
    grid-column: 3 / span 1;
  }

  .description {
    grid-column: 2 / span 10;
    grid-row: 4 / span 1;
  }

  .updateTicket {
    grid-column: 2 / span 10;
    grid-row: 6 / span 1;
  }

  .comments {
    grid-column: 2 / span 10;
    grid-row: 5 / span 1;
    height: 200px;
    overflow: scroll;
  }

  ::-webkit-scrollbar {
    display: none;
  }

</style>
