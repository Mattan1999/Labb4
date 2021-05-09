<template>
  <div class="home">
    <Jokes @jokes-loaded="jokesLoaded" @error-loading-jokes="errorLoadingJokes">
      <div v-show="successfullElementVisible" class="loaded-jokes">
        <h3>Successfully loaded {{ numberOfJokes }} jokes</h3>
      </div>
      <div v-show="errorElementVisible" class="error-loading-jokes">
        <h3 v-if="errorInfo">{{ errorInfo.additionalInfo }}</h3>
      </div>
    </Jokes>
  </div>
</template>

<script>
// @ is an alias to /src
import Jokes from '../components/Jokes.vue'

export default {
  name: 'Home',
  components: {
    Jokes
  },
  data() {
    return {
      numberOfJokes: null,
      jokesToLoad: null,
      successfullElementVisible: true,
      errorElementVisible: false,
      errorInfo: null
    }
  },
  methods:{
    jokesLoaded(numberOfJokesLoaded, number) {
      this.numberOfJokes = numberOfJokesLoaded
      this.jokesToLoad = number
      if (this.numberOfJokes === this.jokesToLoad) {
        setTimeout(() => {
          this.successfullElementVisible = false
          }, 3500)
      }
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
          }, 200)
      // setTimeout(() => {
      //     this.errorElementVisible = false
      //     }, 5000)
      
    }
  }
}
</script>
