import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    totalAmountOfJokesFetched: 0,
    likedJokes: []
  },
  mutations: {
    updateJokesFetched(state, number) {
      state.totalAmountOfJokesFetched += Number(number)
    },
    addLikedJoke(state, joke) {
      state.likedJokes.push(joke)
    },
    removeLikedJoke(state, joke) {
      for (let i = 0; i < state.likedJokes.length; i++) {
        if (state.likedJokes[i].id === joke.id) {
          state.likedJokes.splice(i, 1)
          break
        }
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
