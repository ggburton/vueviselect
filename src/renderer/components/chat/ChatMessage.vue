<template>
  <div class="messageContainer">
    <div class="imageBox">
      <img :src="message.user" alt="stuff">
    </div>
  </div>
</template>

<script>
export default {
  props: ['message']
}
</script>

<style>

.messageContainer {
  display: grid;
  grid-template-rows: repeat(2, auto);
  grid-template-columns: repeat(5, auto);
}


</style>
