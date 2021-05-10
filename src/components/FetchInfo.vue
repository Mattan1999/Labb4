<template>
    <div class="fetch-info">
        <h3>You have fetched a total amount of {{ numberOfTimesFetched }} jokes since you visited this page </h3>
        <h3>You have liked {{ jokesLiked }} jokes since you visited this page </h3>
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
        
    }
}
</script>

<style scoped>
    .fetch-info {
        display: block;
        padding: 1px 10px;
        margin: 20px auto 10px auto;
        background-color: #4b4b4b;
        border-radius: 10px;
        box-shadow: rgba(0, 0, 0, 0.2) 2px 3px 4px;
        text-shadow: rgba(0, 0, 0, 0.6) 1px 2px 2px;
        width: 500px;
        color: #BBBBBB;
    }

    .fetch-info h3 {
        padding-bottom: 15px;
        border-bottom: dashed 2px #17c0eb;
    }
</style>