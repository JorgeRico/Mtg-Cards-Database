<script setup lang="ts">
    interface SetData {
        id              : number,
        setName         : string,
        setReleaseDate  : string,
        setTotalCards   : number,
        ownedCards      : number,
        setLogo         : string,
        numCardsOnADeck : number,
        numPendingCards : number,
        complete        : boolean,
        specialCards    : number,
        backCards       : number,
        oversizedCards  : number
    }    

    const props = defineProps<{
        item: SetData
    }>()
</script>

<template>
    <h1>{{ props.item.setName }}</h1>
    <p class="mb0"><strong>idSet:</strong> {{ props.item.id }}</p>
    <p><strong>Release date</strong>: {{ props.item.setReleaseDate }}</p>
    
    <p class="mb0"><strong>Num cards</strong>: <strong>{{ props.item.setTotalCards }}</strong></p>
    <p class="mb0"><strong>Num Special cards</strong>: <strong> {{ props.item.specialCards }} </strong></p>
    <p class="mb0"><strong>Num Back side cards</strong>: <strong> {{ props.item.backCards }} </strong></p>
    <p class="mb0"><strong>Num Oversized cards</strong>: <strong> {{ props.item.oversizedCards }} </strong></p>
    <p class="mb0"><strong>Num Waiting to arrive cards</strong>: <strong>{{ props.item.numPendingCards }}</strong></p>
    <p class="mb0"><strong>Num cards on Decks</strong>: <strong>{{ props.item.numCardsOnADeck }}</strong></p>
    <p><strong>Owned cards</strong>: <strong>{{ props.item.ownedCards }}</strong></p>

    <p v-if="props.item.complete==true">
        <strong>Complete set</strong>: <strong>YES</strong>
    </p>
    <p v-else>
        <strong>Complete set</strong>: <strong>NO</strong>
    </p> 
</template>

<style lang="css" scoped>
    
</style>