<template>
  <div class="home">
    <Jokes @jokes-loaded="jokesLoaded">
      <div v-show="elementVisible" class="loaded-jokes">
        <h3>Successfully loaded {{ numberOfJokes }} jokes</h3>
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
      elementVisible: true
    }
  },
  methods:{
    jokesLoaded(numberOfJokesLoaded, number) {
      this.numberOfJokes = numberOfJokesLoaded
      this.jokesToLoad = number
      if (this.numberOfJokes === this.jokesToLoad) {
        setTimeout(() => {
          this.elementVisible = false
          console.log("Element visible = " + this.elementVisible)
          }, 2000)
      }
    },
    loadingNewJokes() {
      this.elementVisible = true
    }
  }
}
</script>
