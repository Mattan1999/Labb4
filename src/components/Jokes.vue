<template>
    <div class="joke-page">
        <img :src="image" width="150px">
        <h1>Welcome to funny jokes</h1>
        <h4>Everytime you visit this page 10 jokes will be loaded.</h4>
        <h4>If you want to read more jokes, enter a number!</h4>
        <input class="user-input" type="text" placeholder="Enter number of jokes" v-model="numberOfJokesToLoad">
        <button class="fetch-btn" @click="fetchData(numberOfJokesToLoad)">Load jokes</button>
        <slot></slot>
        <div class="joke-template" v-if="jokes">
            <div class="joke-area-3" v-if="numberOfJokes > 2">
                <div class="joke" v-for="joke in jokes" :key="joke.id">
                    <h4 class="joke-setup">{{ joke.setup }}</h4>
                    <div v-if="joke.showPunchline === false">
                        <input class="punchline-button" type="button" value="Show punchline" @click="showJokePunchline(joke.id)">
                    </div>
                    <div v-if="joke.showPunchline === true">
                        <h4 class="joke-punchline">{{ joke.punchline }}</h4>
                    </div>
                </div>
            </div>
            <div class="joke-area-2" v-else-if="numberOfJokes > 1 && numberOfJokes < 3">
                <div class="joke" v-for="joke in jokes" :key="joke.id">
                    <h4 class="joke-setup">{{ joke.setup }}</h4>
                    <div v-if="joke.showPunchline === false">
                        <input class="punchline-button" type="button" value="Show punchline" @click="showJokePunchline(joke.id)">
                    </div>
                    <div v-if="joke.showPunchline === true">
                        <h4 class="joke-punchline">{{ joke.punchline }}</h4>
                    </div>
                </div>
            </div>
            <div class="joke-area-1" v-else-if="numberOfJokes < 2">
                <div class="joke" v-for="joke in jokes" :key="joke.id">
                    <h4 class="joke-setup">{{ joke.setup }}</h4>
                    <div v-if="joke.showPunchline === false">
                        <input class="punchline-button" type="button" value="Show punchline" @click="showJokePunchline(joke.id)">
                    </div>
                    <div v-if="joke.showPunchline === true">
                        <h4 class="joke-punchline">{{ joke.punchline }}</h4>
                    </div>
                </div>
            </div>
        </div>
        <template v-else>
            <p>Error, could not load any jokes...</p>
        </template>
        
    </div>
</template>


<script>

import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import image from "../assets/img/laugh.png";

Vue.use(VueAxios, axios);

export default {
    name: 'fetch',
    created() {
        this.fetchData(10)
    },
    data() {
        return {
            jokes: [],
            numberOfJokes: 0,
            numberOfJokesToLoad: '',
            image: image,
        }
    },
    props: {
        finishedLoading: {
            type: String,
            default: 'Anonym'
        }
    },
    methods: {
        fetchData: function(number) {
            if (number === 1) {
                this.numberOfJokes = 1
            } else if (number === 2) {
                this.numberOfJokes = 2
            } else {
                this.numberOfJokes = 3
            }
            this.$store.commit('updateJokesFetched', number)
            if (this.jokes !== 0) {
                this.jokes = []
            }
            for(let i = 0; i < number; i++) {
                let url = 'https://official-joke-api.appspot.com/random_joke'
                this.axios.get(url).then((response) => {                  
                    response.data['showPunchline'] = false
                    this.jokes.push(response.data)
                    this.$emit("jokes-loaded", this.jokes.length, number)
                })
            }
        },
        showJokePunchline: function(id) {
            for(let i = 0; i < this.jokes.length; i++) {
                if (this.jokes[i].id === id) {
                    this.jokes[i].showPunchline = true
                }
            }
        }
    }
}
</script>

<style scoped>
.joke-page {
    color: #e0e0e0;
}

.joke-page, h1, h4 {
    text-shadow: rgba(0, 0, 0, 0.6) 1px 2px 3px;
}

.user-input {
    padding: 10px 20px 10px 20px;
    line-height: 20px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    margin-right: 10px;
}

.fetch-btn {
    padding: 10px 20px 10px 20px;
    line-height: 20px;
    border: none;
    border-radius: 5px;
    background-color: #17c0eb;
    font-size: 16px;
}

.joke-template {
    display: flex;
    justify-content: center;
}

.joke-area-1 {
    display: grid;
    grid-template-columns: 300px;
    margin: 20px 10px 10px 10px;
    color: #bbbbbb;
}

.joke-area-2 {
    display: grid;
    grid-template-columns: 300px 300px;
    margin: 20px 10px 10px 10px;
    color: #bbbbbb;
}

.joke-area-3 {
    display: grid;
    grid-template-columns: 300px 300px 300px;
    margin: 20px 10px 10px 10px;
    color: #bbbbbb;
}

.joke {
    padding: 0 10px;
    margin: 0 10px 20px 10px;
    background-color: #4b4b4b;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.2) 2px 3px 4px;
}

.joke-setup {
    color: #e0e0e0;
    text-shadow: rgba(0, 0, 0, 0.6) 1px 2px 2px;
}

.joke-punchline {
    font-weight: 300;
    font-style: italic;
    text-shadow: rgba(0, 0, 0, 0.6) 1px 2px 2px;
}

.punchline-button {
    background-color: #17c0eb;
    border: none;
    border-radius: 5px;
    color: #131212;
    padding: 8px 12px;
    margin: 0 auto 10px auto;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
}

.loaded-jokes {
    display: block;
    padding: 1px 10px;
    margin: 20px auto 10px auto;
    background-color: #4b4b4b;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.2) 2px 3px 4px;
    text-shadow: rgba(0, 0, 0, 0.6) 1px 2px 2px;
    width: 300px;
    color: #2ecc71;
}
</style>