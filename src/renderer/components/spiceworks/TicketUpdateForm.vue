<template>
  <div>
    <h2>Update Ticket</h2>
    <form>
      <div>
        <textarea row="4" cols="20" v-model="body"></textarea>
      </div>
    </form>
    <button @click="cancel">Cancel</button>
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
    cancel () {
      this.$emit('toggleForm')
    },
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
      this.$http.post(`http://localhost:8000/proxy/comments/`, postData)
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

</style>
