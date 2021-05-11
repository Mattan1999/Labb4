<template>
  <div>
    <FetchInfo :amountFetched="fetchedAmount" />
    <div class="developer">
      <p>This web-app was programmed by Mattias Ahlström</p>
    </div>
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
    }
  },
  methods:{
    updateInfo() {
      this.fetchedAmount = this.$store.state.totalAmountOfJokesFetched
    }
  }
}
</script>

<style scoped>
  .developer {
    display: block;
    margin: 25px auto 0 auto;
    padding: 10px;
    width: 300px;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.2) 2px 3px 4px;
    text-shadow: rgba(0, 0, 0, 0.6) 1px 2px 2px;
    color: #BBBBBB;
    background-color: #4b4b4b;
  }

  .developer p {
    font-style: italic;
    display: block;
    margin: auto;
  }
</style>