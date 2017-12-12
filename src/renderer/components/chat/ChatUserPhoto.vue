<template>
  <div class="imageContainer">
    <div class="outerBorder">
      <img :src="buildUrl()" height="45px" width="45px" />
    </div>
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

<style lang="scss" scoped>
  img {
    border-radius: 50%;
    align-self: center;
  }

  .imageContainer {
    display: flex;
    background-color: $primary-color;
    justify-content: center;
    height: 70px;
    width: 70px;
    align-self: center;
  }

  .outerBorder {
    border: 3px solid $highlight-color;
    border-radius: 50%;
    height: 52px;
    width: 52px;
    align-self: center;
    display: flex;
    justify-content: center;
  }

</style>
