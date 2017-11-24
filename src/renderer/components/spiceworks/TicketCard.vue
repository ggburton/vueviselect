<template>
  <div class="card" @click="goDetail">
    <div class="alertPanel" :class="alertLevel"></div>
    <h3 class="card-heading">{{ticket.summary}}</h3>
    <div class="card-body">
      <p>creator: {{ticket.creator.first_name}} {{ticket.creator.last_name}}</p>
      <p>created: {{timeSince(ticket.created_at)}} </p>
      <p>Last Updated: {{timeSince(ticket.updated_at)}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['ticket'],
    methods: {
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
    background-color: #efeee6;
    width: 200px;
    margin-bottom: 15px;
    height: 300px;
    overflow: hidden;
  }

  .card:hover {
    background-color: #ccc9b5;
  }

  .card:hover .card-heading {
    background-color: #b9b9b9;
  }

  .card-heading {
    background-color: #b7b6b2;
    margin-top: 0;
    height: 25%;
    overflow: hidden;
    padding: 10px;
  }

  .card-body {
    margin: 10px 10px;
    overflow: hidden;
  }

  .alertPanel {
    height: 10px;
  }

  .green {
    background-color: green;
  }

</style>
