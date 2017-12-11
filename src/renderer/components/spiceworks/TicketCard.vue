<template>
  <div class="card" @click="goDetail">
    <h3 class="card-heading">{{stripHtml(ticket.summary)}}</h3>
    <div class="card-body">
      <p>creator: {{ticket.creator.first_name}} {{ticket.creator.last_name}}</p>
      <p>created: {{timeSince(ticket.created_at)}} </p>
      <p>Last Updated: {{timeSince(ticket.updated_at)}}</p>
    </div>
  </div>
</template>

<script>
  import { stripHtml } from '../../helpers/striphtml'
  export default {
    props: ['ticket'],
    methods: {
      stripHtml,
      timeSince (time) {
        return this.$moment(time).fromNow()
      },
      goDetail () {
        this.$router.push(`/ticket/${this.ticket.id}`)
      }
    },
    computed: {
      alertLevel () {
        return 'green'
      }
    }
  }
</script>

<style>
  .card {
    width: 200px;
    margin-bottom: 15px 15px;
    height: 300px;
    overflow: hidden;
    border: 4px solid black;
    border-radius: 5px;
  }

  .card:hover {
    border: 4px solid #151515;
  }

  .card:hover .card-heading {
    background-color: #f0f0f0;
  }

  .card-heading {
    background-color: #d8d8d8;
    margin-top: 0;
    height: 25%;
    overflow: hidden;
    padding: 10px;
  }

  .card-body {
    overflow: hidden;
  }



</style>
