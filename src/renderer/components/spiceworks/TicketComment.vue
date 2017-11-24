<template>
  <div class="comment">
    <div class="comment-updated-at-label comment-label">Updated At</div>
    <div class="comment-updated-at comment-data">{{comment.updated_at}}</div>

    <div class="comment-updated-by-label comment-label">Updated By</div>
    <div class="comment-updated-by comment-data">{{comment.creator.first_name}} {{comment.creator.last_name}}</div>
    <div class="comment-text">{{stripHtml(comment.body)}}</div>
  </div>
</template>

<script>
export default {
  props: ['comment'],
  methods: {
    stripHtml (string) {
      return string.replace(/<[^>]+>/g, '')
    }
  }
}
</script>


<style scoped>

.comment {
  display: grid;
  grid-template: repeat(8, 12.5%) / repeat(2, 25%);
  align-items: left;
}

.comment-label {
  grid-column: 1 / span 1;
}

.comment-data {
  grid-column: 2/ span 1;
}

.comment-updated-by-label {
  grid-row: 1 / span 1;
}

.comment-updated-by {
  grid-row: 1 / span 1;
}

.comment-updated-at-label {
  grid-row: 2 / span 1;
}

.comment-updated-at {
  grid-row: 2 / span 1;
}

.comment-text {
  grid-row: 3 /span 2;
  grid-column: 3 / span 2;
}

</style>
