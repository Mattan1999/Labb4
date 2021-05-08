import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    totalAmountOfJokesFetched: 0,
    likedJokes: 0
  },
  mutations: {
    updateJokesFetched(state, number) {
      state.totalAmountOfJokesFetched += Number(number)
    },
    updateLikesJokes(state, number) {
      state.totalAmountOfJokesFetched += Number(number)
    }
  },
  actions: {
  },
  modules: {
  }
})
