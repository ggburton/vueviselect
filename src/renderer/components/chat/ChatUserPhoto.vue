<template>
  <div class="imageContainer">
    <img :src="buildUrl()" height="60px" width="60px" />
  </div>
</template>

<script>
export default {
  props: ['photourl'],
  methods: {
    buildUrl () {
      return `http://${this.$store.getters.getServer}${this.photourl}`
    }
  }
}
</script>

<style>
  img {
    border: 3px solid grey;
    border-radius: 50%;
  }

  .imageContainer {
    display: flex;
    background-color: #fefefe;
    justify-content: center;
  }
</style>
