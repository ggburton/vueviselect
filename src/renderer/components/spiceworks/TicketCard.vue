<template>
  <div class="card" @click="goDetail">
    <h3 class="card-heading">{{stripHtml(ticket.summary)}}</h3>
    <div class="card-body">
      <p>Creator:</p>
      <p>{{ticket.creator.first_name}} {{ticket.creator.last_name}}</p>

      <p>Created:</p>
      <p>{{timeSince(ticket.created_at)}} </p>

      <p>Updated:</p>
      <p>{{timeSince(ticket.updated_at)}}</p>
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

<style lang="scss" scoped>
  .card {
    width: 200px;
    margin-bottom: 15px 15px;
    height: 300px;
    overflow: hidden;
    border: $thick-border;
    border-radius: 5px;
  }

  .card:hover {
    border: 4px solid #151515;
  }

  .card:hover .card-heading {
    background-color: $light-color;
  }

  .card-heading {
    background-color: $dark-color;
    margin-top: 0;
    height: 25%;
    overflow: hidden;
    padding: 10px;
  }

  h3 {
    font-family: $heading-font;
  }

  .card-body {
    overflow: hidden;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, auto);
    text-align: left;
    padding: 8px;
  }


</style>
