<script setup lang="ts">
    import helpers from '../../../../config/helpers.ts';
    import { ref } from 'vue';

    const className = ref<String>('');

    interface CardData {
        id              : number,
        idSet           : number,
        cardName        : string,
        cardJsonLink    : string,
        cardUri         : string,
        cardImg         : string,
        special         : number,
        own             : number,
        pendingToArrive : number,
        isOnADeck       : number,
        isBackCard      : number,
        needUpgrade     : number,
        isOversized     : number,
        setName         : string,
        setLogo         : string,
        isMolCard       : number
    }

    const props = defineProps<{
        item  : CardData,
        index : number
    }>()

    function setOwnYesNo(value: number, item: CardData) {
        helpers.updateCardDataInfo('own', value, item);
        className.value = helpers.setClassName('own', item.own, true);
    }

    function setIsOnADeck(value: number, item: CardData) {
        helpers.updateCardDataInfo('isOnADeck', value, item);
    }

    function setPendingYesNo(value: number, item: CardData) {
        helpers.updateCardDataInfo('pendingToArrive', value, item);
        className.value = helpers.setClassName('pendingToArrive', item.pendingToArrive, true);
    }

    function setNeedUpgrade(value: number, item: CardData) {
        helpers.updateCardDataInfo('needUpgrade', value, item);
    }

    function setIsSpecial(value: number, item: CardData) {
        helpers.updateCardDataInfo('isSpecial', value, item);
    }

    function setIsMolCard(value: number, item: CardData) {
        helpers.updateCardDataInfo('isMolCard', value, item);
        className.value = helpers.setClassName('isMolCard', item.isMolCard, true);
    }

    const initialize = () => {
        if (props.item.isMolCard == 1){
            className.value = helpers.setClassName('isMolCard', props.item.isMolCard, false);
        } else {
            className.value = helpers.setClassName('own', props.item.own, false);
        }
            
    };

    initialize();
</script>

<template>
    <td :class=className>
        {{ props.index+1 }}
    </td>
    <td :class="`${className} cardImgTd`">
        <img :src="props.item.cardImg.toLowerCase().trim()" class="mt10 cardImg"/>
    </td>
    <td :class="`${className} textCenter`">
        <span>
            {{ props.item.cardName }}
        </span>
    </td>
    <td :class=className :key="props.item.own">
        <div class="m-auto w50">
            <div class="mb10 ml10">
                <span class="left text-center cardIcon">
                    <i class="fa-solid fa-chess-queen"></i>
                </span>
                <span class="left cardOption ml10 mr10">mol card: </span>
                <RouterLink 
                    :to="{}" 
                    @click="setIsMolCard(1, props.item)"
                    :class="props.item.isMolCard==1 ? 'disable-link gold' : ''">
                    yes
                </RouterLink>
                <span class="ml5 mr5">|</span>
                <RouterLink 
                    :to="{}" 
                    @click="setIsMolCard(0, props.item)"
                    :class="props.item.isMolCard==0 ? 'disable-link' : ''">
                    no
                </RouterLink>
            </div>
            <div class="mb10 ml10">
                <span class="left text-center cardIcon">
                    <i class="fa-solid fa-chess-queen"></i>
                </span>
                <span class="left cardOption ml10 mr10">special card: </span>
                <RouterLink 
                    :to="{}" 
                    @click="setIsSpecial(1, props.item)"
                    :class="props.item.special==1 ? 'disable-link gold' : ''">
                    yes
                </RouterLink>
                <span class="ml5 mr5">|</span>
                <RouterLink 
                    :to="{}" 
                    @click="setIsSpecial(0, props.item)"
                    :class="props.item.special==0 ? 'disable-link' : ''">
                    no
                </RouterLink>
            </div>
            <div class="mb10 ml10">
                <span class="left text-center cardIcon">
                    <i class="fa-solid fa-chess-board"></i>
                </span>
                <span class="left cardOption ml10 mr10">on a deck: </span> 
                <RouterLink 
                    :to="{}" 
                    @click="setIsOnADeck(1, props.item)"
                    :class="props.item.isOnADeck==1 ? 'disable-link gold' : ''">
                    yes
                </RouterLink>
                <span class="ml5 mr5">|</span>
                <RouterLink 
                    :to="{}" 
                    @click="setIsOnADeck(0, props.item)"
                    :class="props.item.isOnADeck==0 ? 'disable-link' : ''">
                    no
                </RouterLink>
            </div>
            <div class="mb10 ml10">
                <span class="left text-center cardIcon">
                    <i class="fa-solid fa-chess-pawn"></i>
                </span>
                <span class="left cardOption ml10 mr10">need upgrade: </span>
                <RouterLink 
                    :to="{}" 
                    @click="setNeedUpgrade(1, props.item)"
                    :class="props.item.needUpgrade==1 ? 'disable-link gold' : ''">
                    yes
                </RouterLink>
                <span class="ml5 mr5">|</span>
                <RouterLink 
                    :to="{}" 
                    @click="setNeedUpgrade(0, props.item)"
                    :class="props.item.needUpgrade==0 ? 'disable-link' : ''">
                    no
                </RouterLink>
            </div>
            <div class="mb10 ml10">
                <span class="left text-center cardIcon">
                    <i class="fa-solid fa-circle-arrow-right"></i>
                </span>
                <span class="left cardOption ml10 mr10">pending to arrive: </span>
                <RouterLink 
                    :to="{}" 
                    @click="setPendingYesNo(1, props.item)"
                    :class="props.item.pendingToArrive==1 ? 'disable-link gold' : ''">
                    yes
                </RouterLink>
                <span class="ml5 mr5">|</span>
                <RouterLink 
                    :to="{}" 
                    @click="setPendingYesNo(0, props.item)"
                    :class="props.item.pendingToArrive==0 ? 'disable-link' : ''">
                    no
                </RouterLink>
            </div>
            <div class="mb10 ml10">
                <span class="left text-center cardIcon">
                    <i class="fa-solid fa-chess-rook"></i>
                </span>
                <span class="left cardOption ml10 mr10">own: </span>
                <RouterLink 
                    :to="{}" 
                    @click="setOwnYesNo(1, props.item)"
                    :class="props.item.own==1 ? 'disable-link gold' : ''">
                    yes
                </RouterLink>
                <span class="ml5 mr5">|</span>
                <RouterLink 
                    :to="{}" 
                    @click="setOwnYesNo(0, props.item)"
                    :class="props.item.own==0 ? 'disable-link' : ''">
                    no
                </RouterLink>
            </div>
        </div>
    </td>
</template>

<style lang="css" scoped>
    .cardImg, .cardImgTd {
        width: 100px;
        padding: 5px;
    }

    .cardImg:hover {
        margin-left: 50px;
        transform: scale(3.5); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
    }

    .cardIcon {
        width: 20px;
    }

    .cardOption {
        width: 130px;
    }

    .gold {
        color: gold !important;
        text-shadow: -1px 1px 8px black;
    }

    td {
        background: lightgray;
        padding: 20px 0 10px 0;

        & span {
            margin-left: 10px;
        }
    }

    td:first-child {
        width: 20px;
        text-align: center;
    }
</style>