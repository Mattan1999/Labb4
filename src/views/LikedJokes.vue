<template>
    <div>
        <h3 v-if="$route.params.text === 'liked-jokes'">{{ getHeaderTitle }}</h3>
            
        <div class="joke-template" v-if="jokes.length !== 0">
            <div class="joke-area">
                <div class="joke" v-for="joke in jokes" :key="joke.id">
                    <p class="joke-setup">{{ joke.setup }}</p>
                    <p class="joke-punchline">{{ joke.delivery }}</p>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="joke-template">
                <h5>You have not liked any jokes yet!</h5>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: 'LikedJokes',
    data() {
        return {
            jokes: this.$store.state.likedJokes
        }
    },
    computed: {
        getHeaderTitle() {
            return 'Your liked jokes'
        }
    }
}
</script>

<style scoped>
    h4 {
        
    }

    .joke-template {
        display: flex;
        justify-content: center;
    }

    .joke-area {
        display: grid;
        grid-template-columns: 300px 300px 300px;
        margin: 20px 10px 10px 10px;
    }

    .joke {
        padding: 0 10px;
        margin: 0 10px 20px 10px;
        background-color: #4b4b4b;
        border-radius: 10px;
        box-shadow: rgba(0, 0, 0, 0.2) 2px 3px 4px;;
    }

    .joke-setup, .joke-punchline {
        display: block;
        margin: auto;
        text-shadow: rgba(0, 0, 0, 0.6) 1px 2px 2px;
    }

    .joke-setup {
        margin: 10px;
        font-weight: 600;
        color: #e0e0e0;
    }

    .joke-punchline {
        margin-bottom: 10px;
        color: #BBBBBB;
        font-style: italic;
    }
</style>