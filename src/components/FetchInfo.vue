<template>
    <div class="fetch-info">
        <div class="card">
            <h5>{{ numberOfTimesFetchedString }}</h5>
        </div>
    </div>
</template>


<script>
export default {
    name: 'FetchInfo',
    data() {
        return {
            numberOfTimesFetched: this.amountFetched,
        }
    },
    props: {
        amountFetched: {
            type: Number,
            default: 0
        },
    },
    methods: {
        
    },
    computed: {
        numberOfTimesFetchedString() {
            return "You have fetched a total amount of '" + this.numberOfTimesFetched + "' jokes since you visited this page"
        },
    }
}
</script>

<style scoped>
    .fetch-info {
        display: flex;
        justify-content: center;
    }

    .card {
        padding: 15px;
        margin: 20px 10px 20px 10px;
        background-color: #4b4b4b;
        border-radius: 10px;
        box-shadow: rgba(0, 0, 0, 0.2) 2px 3px 4px;
        text-shadow: rgba(0, 0, 0, 0.6) 1px 2px 2px;
        color: #e0e0e0;
        max-width: 700px;
    }

    .card h5 {
        margin: auto;
        padding-top: 15px;
        padding-bottom: 15px;
        
    }
</style>