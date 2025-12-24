<script setup lang="ts">
    const emit = defineEmits<{
        (event: 'customFilterIdChange'): void
        (event: 'customFilterNameChange'): void
        (event: 'customFilterSetChange', option: number): number
        (event: 'customFilterAllCardsChange', option: number): number
        (event: 'customFilterPendingCardsChange', option: number): number
        (event: 'customFilterMolCardsChange'): void
        (event: 'customFilterSpecialCardsChange'): void
        (event: 'customFilterCardsOnADeckChange'): void
        (event: 'customFilterCardsNeedUpgradeChange'): void
        (event: 'customFilterCardsPendingToArriveChange'): void
        (event: 'customFilterCardsNotOwnedChange'): void
    }>()

    const orderById = () => {
        emit('customFilterIdChange')
    }
    const orderByName = () => {
        emit('customFilterNameChange')
    }
    const showMolCards = () => {
        emit('customFilterMolCardsChange')
    }
    const showSpecialCards = () => {
        emit('customFilterSpecialCardsChange')
    }
    const showCardsOnADeck = () => {
        emit('customFilterCardsOnADeckChange')
    }
    const showCardsNeedUpgrade = () => {
        emit('customFilterCardsNeedUpgradeChange')
    }
    const showCardsPendingToArrive = () => {
        emit('customFilterCardsPendingToArriveChange')
    }
    const showNotOwnedCards = () => {
        emit('customFilterCardsNotOwnedChange')
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

            <li><a class="dropdown-item" @click="showMolCards()">Show Mol cards</a></li>
            <li><a class="dropdown-item" @click="showSpecialCards()">Show Special cards</a></li>
            <li><a class="dropdown-item" @click="showCardsOnADeck()">Show cards on a deck</a></li>
            <li><a class="dropdown-item" @click="showCardsNeedUpgrade()">Show cards need upgrade</a></li>
            <li><a class="dropdown-item" @click="showCardsPendingToArrive()">Show cards pending to arrive</a></li>
            <li><a class="dropdown-item" @click="showNotOwnedCards()">Show NOT owned cards</a></li>
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