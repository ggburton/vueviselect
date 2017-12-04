<template>
  <div v-if="ticket" class="detail-container">
    <div class="header">
      <router-link to="/ticket" class="link">Back to ticket list</router-link>
      <button @click="workon">Workon!</button>
      <h3>{{ticket.summary}}</h3>
    </div>

    <div class="created-label label" >Created</div>
    <div class="created data">{{ticket.created_at}}</div>

    <div class="created-by-label label">Created By</div>
    <div class="created-by data">{{ticket.created_by}}</div>

    <div class="status-label label">Status</div>
    <div class="status data">{{ticket.status}}</div>

    <div class="time-spent-label label">Time Spent</div>
    <div class="time-spent data">{{ticket.time_spent_duration}}</div>

    <div class="updated-at-label label">Last Updated</div>
    <div class="updated-at data">{{ticket.updated_at}}</div>

    <div class="due-at-label label">Due At</div>
    <div class="due-at data">{{ticket.due_at}}</div>

    <div class="description-label label">Description</div>
    <div class="description">{{stripHtml(ticket.description)}}</div>
    <div>
      <div class="comments">
        <h3>Comments</h3>
          <ticket-comment v-for="comment in ticket.comments" :key="comment.updated_at" :comment="comment"></ticket-comment>
        </div>
        <button @click="toggleForm" v-show="!addComment">Update Ticket</button>
        <ticket-update-form v-show="addComment" v-on:toggleForm="toggleForm" v-on:closeForm="closeForm" :ticket="ticket"></ticket-update-form>
      </div>
    </div>
  </div>
</template>

<script>
import TicketComment from './TicketComment'
import TicketUpdateForm from './TicketUpdateForm'
export default {
  data () {
    return {
      ticket: null,
      addComment: false
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
    toggleForm () {
      this.addComment = !this.addComment
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
    closeForm () {
      this.toggleForm()
      this.updateTicket()
    },
    workon () {
      const payload = {
        ticket: this.ticket.id,
        startTime: this.$moment.now()
      }
      this.$store.dispatch('work_on_ticket', payload)
    }
  },
  mounted () {
    this.updateTicket()
  }
}
</script>


<style>
 .detail-container {
   display: grid;
   grid-template: repeat(12, auto) / repeat(5, auto);
   align-items: center;
   width: 80%;
   margin: 0 auto;
 }

 .header {
   grid-row: 1;
   grid-column: 1 / span 12;
   text-align: center;
   background-color: #eee;
 }

 .label {
   grid-column: 1 / span 4;
 }

 .data {
   grid-column: 5 / span 8;
 }

 .created-label {
   grid-row: 2;
 }

.created {
  grid-row: 2;
}

.created-by-label {
  grid-row: 3;
}

.created-by {
  grid-row: 3;
}

.status-label {
  grid-row: 4;
}

.status {
  grid-row: 4;
}

.time-spent-label {
  grid-row: 5;
}

.time-spent {
  grid-row: 5;
}

.updated-at-label {
  grid-row: 6;
}

.updated-at {
  grid-row: 6;
}

.due-at-label {
  grid-row: 7;
}

.due-at {
  grid-row: 7;
}

.description-label {
  grid-row: 8;
}

.description {
  grid-row: 8;
  grid-column: 1 / span 12;
}

</style>
