<template>
    <div class="fetch-info">
        <h5>{{ numberOfTimesFetchedString }}</h5>
    </div>
</template>


<script>
export default {
    name: 'FetchInfo',
    data() {
        return {
            numberOfTimesFetched: this.amountFetched,
            jokesLiked: this.likeAmount
        }
    },
    props: {
        amountFetched: {
            type: Number,
            default: 0
        },
        likeAmount: {
            type: Number,
            default: 0
        }
    },
    methods: {
        
    },
    computed: {
        numberOfTimesFetchedString() {
            return 'You have fetched a total amount of ' + this.numberOfTimesFetched + ' jokes since you visited this page'
        },
        jokesLikedString() {
            return 'You have liked ' + this.jokesLiked + ' jokes since you visited this page'
        }
    }
}
</script>

<style scoped>
    .fetch-info {
        display: block;
        padding: 15px 10px;
        margin: 20px auto;
        background-color: #4b4b4b;
        border-radius: 10px;
        box-shadow: rgba(0, 0, 0, 0.2) 2px 3px 4px;
        text-shadow: rgba(0, 0, 0, 0.6) 1px 2px 2px;
        width: 500px;
        color: #BBBBBB;
    }

    .fetch-info h5 {
        padding-top: 15px;
        padding-bottom: 15px;
        border-top: dashed 2px #17c0eb;
        border-bottom: dashed 2px #17c0eb;
    }
</style>