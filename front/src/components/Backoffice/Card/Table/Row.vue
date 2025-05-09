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
        <div class="mb10">
            <span>on a deck: </span> 
            <a href="#" :class="props.item.isOnADeck==true ? 'disable-link' : ''">yes</a> 
            <span class="ml5 mr5">|</span>
            <a href="#" :class="props.item.isOnADeck==false ? 'disable-link' : ''">no</a>
        </div>
        <div class="mb10">
            <span>need upgrade: </span>
            <a href="#" :class="props.item.needUpgrade==true ? 'disable-link' : ''">yes</a>
            <span class="ml5 mr5">|</span>
            <a href="#" :class="props.item.needUpgrade==false ? 'disable-link' : ''">no</a>
        </div>
        <div class="mb10">
            <span>pending to arrive: </span>
            <a href="#" :class="props.item.pendingToArrive==true ? 'disable-link' : ''">yes</a>
            <span class="ml5 mr5">|</span>
            <a href="#" :class="props.item.pendingToArrive==false ? 'disable-link' : ''">no</a>
        </div>
        <div class="mb10">
            <span>own: </span>
            <a href="#" :class="props.item.own==true ? 'disable-link' : ''">yes</a>
            <span class="ml5 mr5">|</span>
            <a href="#" :class="props.item.own==false ? 'disable-link' : ''">no</a>
        </div>
    </td>
</template>

<style lang="css" scoped>
    .cardImg {
        width: 100px;
    }
</style>