<script setup lang="ts">
    interface CardData {
        id              : number,
        idSet           : number,
        cardName        : string,
        cardJsonLink    : string,
        cardUri         : string,
        cardImg         : string,
        special         : boolean,
        own             : boolean,
        pendingToArrive : boolean,
        isOnADeck       : boolean,
        isBackCard      : boolean,
        needUpgrade     : boolean,
        isOversized     : boolean,
    }

    const props = defineProps<{
        item  : CardData,
        index : number
    }>()
    
    var className = '';

    if (props.item.own == true) {
        className = 'complete';
    }
</script>

<template>
    <td :class=className>
        {{ props.index+1 }}
    </td>
    <td :class=className>
        <img :src="props.item.cardImg.toLowerCase().trim()" class="cardImg"/>
    </td>
    <td :class=className>
        {{ props.item.cardName }}
    </td>
    <td :class=className>
        <div>on a deck: {{ props.item.isOnADeck }}</div>
        <div>need upgrade: {{ props.item.needUpgrade}}</div>
        <div>pending to arrive: {{ props.item.pendingToArrive}}</div>
        <div>own: {{ props.item.own}}</div>
    </td>
</template>

<style lang="css" scoped>
    .cardImg {
        width: 100px;
    }
</style>