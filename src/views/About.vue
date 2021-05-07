<template>
  <div class="about">
    <h3>Total amount of jokes you have fetched since you visited this page: </h3>
    <p>{{ $store.state.totalAmountOfJokesFetched }}</p>
  </div>
</template>

<style scoped>
.about {
  color: #FFFFFF;
}
</style>