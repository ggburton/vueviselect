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

<style>
  img {
    border-radius: 50%;
    align-self: center;
  }

  .imageContainer {
    display: flex;
    background-color: #efefef;
    justify-content: center;
    height: 70px;
    width: 70px;
    align-self: center;
  }

  .outerBorder {
    border: 3px solid #0f2d6a;
    border-radius: 50%;
    height: 52px;
    width: 52px;
    align-self: center;
    display: flex;
    justify-content: center;
  }

</style>
