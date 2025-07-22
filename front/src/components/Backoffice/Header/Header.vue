<script setup lang="ts">
    import router from '../../../router.ts';
    import { ref } from 'vue';

    const searchCards = ref('');

    function getCards() {    
        router.push({ name: 'searchCards', query: { cardName: searchCards.value } })
    }
</script>

<template>    
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
        <div class="container-fluid">
            <div class="search right">
                <input 
                    placeholder="Search cards...."
                    v-model="searchCards"
                    type="input" 
                    @keyup.enter="getCards()"/>
            </div>
        </div>
    </nav>
</template>

<style lang="css" scoped>
    .fixed-top {
        padding: 1em;
    }
    
    .container-fluid {
        text-align: right;
        display: block;
    }

    .search {
        border: 1px solid grey;
        padding: 0.5em 1em;
        border-radius: 50px;
        background: white;
        color: black;
        width: 200px;
        text-align: left;
        & input {
            width: 100%;
            border: none;
        }
    }
</style>
