<template>
  <div class="home">
    <img class="img" :src="image" width="125px">
    <h1>Welcome to funny jokes</h1>
    <h5>Everytime you visit this page 10 jokes will be loaded.</h5>
    <h5>If you want to read more jokes, enter a number!</h5>
    <Jokes @jokes-loaded="jokesLoaded" @error-loading-jokes="errorLoadingJokes" @loading-new-jokes="loadingNewJokes" @not-valid="inputError">
      <div v-if="isOnline">
        <div v-show="successfullElementVisible" class="loaded-jokes">
          <h5>Successfully loaded {{ numberOfJokes }}/{{jokesToLoad}} jokes</h5>
          <b-spinner v-show="loading" label="Loading..." class="loading"></b-spinner>
        </div>
        <div v-show="inputErr" class="error-loading-jokes">
          <h5>You must enter a number higher than 1</h5>
        </div>
        <div v-show="errorElementVisible" class="error-loading-jokes">
          <h5 v-if="errorInfo">{{ errorInfo.additionalInfo }}</h5>
        </div>
      </div>
      <div v-if="isOffline" class="network-status">
        <h4 >You are currently offline!<br>The page wont work</h4>
      </div>
    </Jokes>
  </div>
</template>

<script>
// @ is an alias to /src
import Jokes from '../components/Jokes.vue'
import image from "../assets/img/laugh.png";

export default {
  name: 'Home',
  components: {
    Jokes
  },
  data() {
    return {
      numberOfJokes: null,
      jokesToLoad: null,
      successfullElementVisible: null,
      errorElementVisible: false,
      errorInfo: null,
      inputErr: false,
      loading: false,
      image: image
    }
  },
  methods:{
    inputError() {
      this.inputErr = true
      this.successfullElementVisible = false
      setTimeout(() => {
        this.inputErr = false
      }, 5000)
      
    },
    jokesLoaded(numberOfJokesLoaded, number) {
      this.loading = true
      this.inputErr = false
      this.numberOfJokes = numberOfJokesLoaded
      this.jokesToLoad = number
    },
    loadingNewJokes() {
      this.successfullElementVisible = true
    },
    errorLoadingJokes(error) {
      this.errorElementVisible = true
      this.errorInfo = error
      console.log(this.errorInfo)
      setTimeout(() => {
        this.successfullElementVisible = false
      }, 0)
    }
  },
  watch: {
    numberOfJokes() {
      if (this.jokesToLoad === this.numberOfJokes) {
        setTimeout(() => {
          this.loading = false
        }, 1000)
        setTimeout(() => {
          this.successfullElementVisible = false
        }, 4000)
      }
    }
  }
}
</script>

<style scoped>
  .home, h1 {
    font-size: 2rem;
  }
  .home, h5 {
    font-size: 1.1rem;
  }
</style>