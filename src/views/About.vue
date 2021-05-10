<template>
  <div class="about">
    <FetchInfo :amountFetched="fetchedAmount" :likeAmount="amountLiked" />
  </div>
</template>

<script>

import FetchInfo from '../components/FetchInfo.vue'

export default {
  name: 'About',
  components: {
    FetchInfo
  },
  created() {
    this.updateInfo()
  },
  data() {
    return {
      fetchedAmount: 0,
      amountLiked: 0
    }
  },
  methods:{
    updateInfo() {
      this.fetchedAmount = this.$store.state.totalAmountOfJokesFetched
      this.amountLiked = this.$store.state.likedJokes
    }
  }
}
</script>

<style scoped>
  .about {
    color: #FFFFFF;
  }
</style>