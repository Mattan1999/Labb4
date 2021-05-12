<template>
    <div class="joke-page">
        <input class="user-input" type="number" placeholder="Enter a number..." v-model="numberOfJokesToLoad">
        <button class="fetch-btn" @click="fetchData(numberOfJokesToLoad)">Load jokes</button>
        <slot></slot>
        <div class="joke-template" v-if="jokes">
            <div :class="{'joke-area-3': numberOfJokes > 2, 'joke-area-2': numberOfJokes > 1 && numberOfJokes < 3, 'joke-area-1': numberOfJokes < 2}">
                <div class="joke" v-for="joke in jokes" :key="joke.id">
                    <p class="joke-setup">{{ joke.setup }}</p>
                    <div v-if="!joke.showPunchline">
                        <input class="punchline-button" type="button" value="Show punchline" @click="showJokePunchline(joke.id)">
                    </div>
                    <div v-if="joke.showPunchline">
                        <p class="joke-punchline">{{ joke.delivery }}</p>
                        <b-icon v-if="joke.liked" icon="heart-fill" variant="danger" font-scale="1.5" class="like" @click="likedJoke(joke.id)"></b-icon>
                        <b-icon v-else icon="heart" font-scale="1.5" class="like" @click="likedJoke(joke.id)"></b-icon>
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

Vue.use(VueAxios, axios);

export default {
    name: 'fetch',
    created() {
        this.fetchData(10)
        this.$on('online', () => {
            this.fetchData(10)
        })
    },
    mounted() {
        
    },
    data() {
        return {
            jokes: [],
            numberOfJokes: 0,
            numberOfJokesToLoad: '',
            foundDuplicate: false,
            errorResponse: null,
        }
    },
    methods: {
        fetchData: function(number) {
            if (number < 1) {
                this.$emit("not-valid")
                this.jokes = []
            } else {
                if (this.jokes !== 0) {
                    this.jokes = []
                }
                this.$emit("loading-new-jokes")
                if (number === 1) {
                    this.numberOfJokes = 1
                } else if (number === 2) {
                    this.numberOfJokes = 2
                } else {
                    this.numberOfJokes = 3
                }
                this.$store.commit('updateJokesFetched', number)
                for(let i = 0; i < number; i++) {
                    let url = 'https://v2.jokeapi.dev/joke/Any?type=twopart'
                    this.axios.get(url).then((response) => {
                        // for(let i = 0; i < this.jokes.length; i++) {
                        //     if (this.jokes[i].id === response.data.id) {
                        //         this.foundDuplicate = true
                        //         console.log("Found duplicate!!!")
                        //     }
                        // }
                        response.data['showPunchline'] = false
                        response.data['liked'] = false
                        this.jokes.push(response.data)
                        this.$emit("jokes-loaded", this.jokes.length, Number(number))
                    })
                    .catch(err => {
                        if (err.response) {
                            this.errorResponse = err.response.data
                            this.$emit("error-loading-jokes", this.errorResponse)
                        } else if (err.request) {
                            console.log("err.request")
                            console.log(err.request.response.error)
                        } else {
                            console.log("else (kanske duplicate?)")
                        }
                    })
                }
            }
        },
        showJokePunchline: function(id) {
            for(let i = 0; i < this.jokes.length; i++) {
                if (this.jokes[i].id === id) {
                    this.jokes[i].showPunchline = true
                }
            }
        },
        likedJoke: function(id) {
            for(let i = 0; i < this.jokes.length; i++) {
                if (this.jokes[i].id === id) {
                    this.jokes[i].liked = !this.jokes[i].liked
                    if (this.jokes[i].liked) {
                        this.$store.commit('addLikedJoke', this.jokes[i])
                    } else {
                        this.$store.commit('removeLikedJoke', this.jokes[i])
                    }
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>

    $button-color: #17c0eb;
    $success: #32ff7e;
    $error: #ff3838;
    $punchline-color: #bbbbbb;
    $box-shadow: rgba(0, 0, 0, 0.2) 2px 3px 4px;
    $text-shadow: rgba(0, 0, 0, 0.6) 1px 2px 2px;
    $white-color: #EBEBEB;
    $padding: 8px 12px 8px 12px;
    $background-color: #4b4b4b;


    .joke-page {
        color: #e0e0e0;
        margin-top: 20px;
    }

    .user-input, .fetch-btn {
        display: inline-block;
        margin: 0 auto;
    }

    .user-input {
        padding: 10px 15px 10px 15px;
        line-height: 20px;
        font-size: 16px;
        border: none;
        border-radius: 5px;
        width: 60%;
        margin-right: 10px;
        background-color: $white-color;
    }

    .fetch-btn {
        padding: 10px 15px 10px 15px;
        line-height: 20px;
        border: none;
        border-radius: 5px;
        background-color: $button-color;
        font-size: 16px;
        width: 30%;
    }

    .joke-area-3 {
        display: block;
        margin: 20px auto 0 auto;
        width: 85%;
        color: $punchline-color;
    }

    .joke {
        padding: 0 10px;
        margin: 0 10px 20px 10px;
        background-color: #4b4b4b;
        border-radius: 10px;
        box-shadow: $box-shadow;
    }

    .joke-setup {
        padding: 10px 0 0 0;
        font-weight: 600;
        color: #e0e0e0;
        text-shadow: $text-shadow;
    }

    .joke-punchline {
        font-style: italic;
        text-shadow: $text-shadow;
    }

    .punchline-button {
        padding: $padding;
        line-height: 20px;
        border: none;
        border-radius: 5px;
        background-color: $button-color;
        font-size: 16px;
        margin: 0 auto 10px auto;
    }

    .like {
        margin-bottom: 10px;
    }

    .loaded-jokes {
        display: block;
        padding: 1px 10px;
        margin: 30px auto 10px auto;
        background-color: #4b4b4b;
        border-radius: 10px;
        box-shadow: $box-shadow;
        text-shadow: $text-shadow;
        width: 80%;
        color: $success;
    }

    .loaded-jokes h5, .error-loading-jokes h5 {
        padding: 15px;
    }

    .error-loading-jokes {
        display: block;
        margin: 20px auto 0 auto;
        background-color: #4b4b4b;
        border-radius: 10px;
        box-shadow: $box-shadow;
        text-shadow: $text-shadow;
        width: 80%;
        color: $error;
    }

    .loading {
        padding: 1px 10px;
        margin: 0px auto 15px auto;
        color: $white-color;
    }

    .network-status {
        display: block;
        padding: 15px 0 15px 0;
        margin: 20px auto 0 auto;
        background-color: #4b4b4b;
        border-radius: 10px;
        box-shadow: $box-shadow;
        text-shadow: $text-shadow;
        width: 80%;
        color: $error;
    }

    @media (min-width: 513px) and (max-width: 899px) {
        .user-input {
            padding: 10px 15px 10px 15px;
            line-height: 20px;
            font-size: 16px;
            border: none;
            border-radius: 5px;
            width: 60%;
            margin-right: 10px;
            background-color: $white-color;
        }

        .fetch-btn {
            padding: 10px 15px 10px 15px;
            line-height: 20px;
            border: none;
            border-radius: 5px;
            background-color: $button-color;
            font-size: 16px;
            width: 30%;
        }

        .joke-template {
            display: flex;
            justify-content: center;
        }

        .joke-area-3 {
            display: grid;
            grid-template-columns: 50% 50%;
        }

        .loaded-jokes {
            width: 350px;
        }

        .network-status {
            width: 350px;
        }
    }

    @media (min-width: 900px) {
        .user-input {
            width: 300px;
        }

        .fetch-btn {
            width: 125px;
        }

        .joke-template {
            display: flex;
            justify-content: center;
        }

        .joke-area-3 {
            display: grid;
            grid-template-columns: 33.33% 33.33% 33.33%;
        }

        .loaded-jokes {
            width: 350px;
        }

        .error-loading-jokes {
            width: 40%;
        }

        .network-status {
            width: 350px;
        }
    }

</style>