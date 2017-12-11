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
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, auto);
  grid-row-gap: 8px;
  align-items: left;
  border: 1px solid black;
  border-radius: 3px;
  padding: 8px 8px;
  margin-top: 20px;
  background-color: #ffffff;
}

.comment-label {
  grid-column: 1 / span 1;
}

.comment-data {
  grid-column: 3 / span 1;
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
  grid-row: 3 /span 1;
  grid-column: 1 / span 3;
}

</style>
