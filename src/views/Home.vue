<template>
  <div class="home">
    <Jokes @jokes-loaded="jokesLoaded">
      <div class="loaded-jokes" v-if="isJokesLoaded">
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
      isJokesLoaded: false,
      numberOfJokes: ''
    }
  },
  methods:{
    jokesLoaded(numberOfJokesLoaded) {
      this.isJokesLoaded = true
      this.numberOfJokes = numberOfJokesLoaded
    }
  }
}
</script>
