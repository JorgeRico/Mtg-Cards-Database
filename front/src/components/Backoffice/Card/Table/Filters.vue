<script setup lang="ts">
    const emit = defineEmits<{
        (event: 'customFilterIdChange'): void
        (event: 'customFilterNameChange'): void
        (event: 'customFilterSetChange', option: number): number
        (event: 'customFilterAllCardsChange', option: number): number
        (event: 'customFilterPendingCardsChange', option: number): number
    }>()

    const orderById = () => {
        emit('customFilterIdChange')
    }
    const orderByName = () => {
        emit('customFilterNameChange')
    }
    const completeSet = (option: number) => {
        emit('customFilterSetChange', option)
    }
    const setAllCards = (option: number) => {
        emit('customFilterAllCardsChange', option)
    }
    const setAllPendingCards = (option: number) => {
        emit('customFilterPendingCardsChange', option)
    }
</script>

<template>
    <div class="right dropdown">
        <button class="btn btn-primary dropdown-toggle ml10" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Filter By
        </button>
        <ul class="dropdown-menu">
            <li><a class="dropdown-item" @click="orderById()">Order by DB Id</a></li>
            <li><a class="dropdown-item" @click="orderByName()">Order by Name</a></li>
        </ul>
    </div>
    <div class="right dropdown">
        <button class="btn btn-primary dropdown-toggle ml10" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Options
        </button>
        <ul class="dropdown-menu">
            <a class="dropdown-item" @click="completeSet(1)">Mark Set as Complete</a>
            <a class="dropdown-item" @click="completeSet(0)">Mark Set as UnComplete</a>
            <a class="dropdown-item" @click="setAllCards(1)">Complete all (cards and set)</a>
            <a class="dropdown-item" @click="setAllCards(0)">UnComplete all (cards and set)</a>
            <a class="dropdown-item" @click="setAllPendingCards(1)">Mark all cards as "On Cart"</a>
            <a class="dropdown-item" @click="setAllPendingCards(0)">Unmark all cards "On Cart"</a>
        </ul>
    </div>
</template>

<style lang="css" scoped>
    
</style>