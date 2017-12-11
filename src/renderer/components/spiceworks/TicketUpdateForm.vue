<template>
  <div class="ticketUpdateFormDiv">
    <h4>Update Ticket</h4>
    <form>
      <div>
        <textarea id="ticketUpdate" row="10" cols="20" v-model="body"></textarea>
      </div>
    </form>
    <button @click="submit">Submit</button>
  </div>
</template>


<script>
export default {
  props: ['ticket'],
  data () {
    return {
      body: null
    }
  },
  methods: {
    submit () {
      console.log(this.$store.state.Spiceworks.csrf_token)
      const postData = {
        'authenticity_token': this.$store.state.Spiceworks.session_details.csrf_token,
        'is_public': true,
        'type': 'response',
        'comment_type': 'response',
        'ticket': '',
        'ticket_id': this.ticket.id,
        'keep_closed': false,
        'body': this.body,
        'attachment': null
      }
      const server = this.$store.getters.getServer
      this.$http.post(`http://${server}/proxy/comments/`, postData)
        .then(response => {
          console.log(response)
          this.$emit('closeForm')
        })
        .catch(err => console.log(err))
    }
  }
}
</script>


<style>
 .ticketUpdateFormDiv {
   text-align: center;
 }

 #ticketUpdate {
   width: 100%;
   height: 100px;
   overflow: scroll;
   resize: none;
 }
</style>
