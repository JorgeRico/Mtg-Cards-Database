<script setup lang="ts">
    import { ref } from 'vue';
    import { useToast } from 'vue-toastification';

    const toast     = useToast()
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
    }

    const props = defineProps<{
        item  : CardData,
        index : number
    }>()
    
    function setClassName(value: number) {
        if (value == 1) {
            className.value = 'complete';
        } else {
            className.value = '';
        }
    }

    function setOwnYesNo(value: number) {
        updateCardDataInfo('own', value);
    }

    function setIsOnADeck(value: number) {
        updateCardDataInfo('isOnADeck', value);
    }

    function setPendingYesNo(value: number) {
        updateCardDataInfo('pendingToArrive', value);
    }

    function setNeedUpgrade(value: number) {
        updateCardDataInfo('needUpgrade', value);
    }

    function setIsSpecial(value: number) {
        updateCardDataInfo('isSpecial', value);
    }

    function updateCardDataInfo(key: string, value: number) {
        var url  = import.meta.env.VITE_API_SERVER + import.meta.env.VITE_API_SET_CARDS_ENDPOINT + '/' + props.item.idSet + '/cards/' + props.item.id;

        const requestOptions = {
            method  : 'PUT',
            headers : { 'Content-Type': 'application/json' },
            body    : JSON.stringify({ [key]: value})
        };

        fetch(url, requestOptions).then(async response => {
            const data = await response.json();
            console.log(data)

            if (key == 'own') {
                props.item.own = value;
                
                if (value == 1) {
                    props.item.pendingToArrive = 0;
                }
                setClassName(value)
            }
            if (key == 'needUpgrade') {
                props.item.needUpgrade = value;
            }
            if (key == 'isOnADeck') {
                props.item.isOnADeck = value;
            }
            if (key == 'pendingToArrive') {
                props.item.pendingToArrive = value;
                if (value == 1) {
                    props.item.own = 0;
                }
                setClassName(props.item.own);
            }
            if (key == 'isSpecial') {
                props.item.special = value;
            }

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = response.status;
                toast.error(data.message);
                return Promise.reject(error);
            }
            toast.success('Successfully updated')
        })
        .catch(error => {
            console.error('There was an error!', error);
            toast.error('There was an error!');
        });
    }

    const initialize = () => {
        setClassName(props.item.own);
    };

    initialize();
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
    <td :class=className :key="props.item.own">
        <div class="mb10">
            <span class="left text-center cardIcon">
                <i class="fa-solid fa-chess-queen"></i>
            </span>
            <span class="left cardOption ml10 mr10">special card: </span>
            <RouterLink 
                :to="{}" 
                @click="setIsSpecial(1)"
                :class="props.item.special==1 ? 'disable-link gold' : ''">
                yes
            </RouterLink>
            <span class="ml5 mr5">|</span>
            <RouterLink 
                :to="{}" 
                @click="setIsSpecial(0)"
                :class="props.item.special==0 ? 'disable-link' : ''">
                no
            </RouterLink>
        </div>
        <div class="mb10">
            <span class="left text-center cardIcon">
                <i class="fa-solid fa-chess-board"></i>
            </span>
            <span class="left cardOption ml10 mr10">on a deck: </span> 
            <RouterLink 
                :to="{}" 
                @click="setIsOnADeck(1)"
                :class="props.item.isOnADeck==1 ? 'disable-link gold' : ''">
                yes
            </RouterLink>
            <span class="ml5 mr5">|</span>
            <RouterLink 
                :to="{}" 
                @click="setIsOnADeck(0)"
                :class="props.item.isOnADeck==0 ? 'disable-link' : ''">
                no
            </RouterLink>
        </div>
        <div class="mb10">
            <span class="left text-center cardIcon">
                <i class="fa-solid fa-chess-pawn"></i>
            </span>
            <span class="left cardOption ml10 mr10">need upgrade: </span>
            <RouterLink 
                :to="{}" 
                @click="setNeedUpgrade(1)"
                :class="props.item.needUpgrade==1 ? 'disable-link gold' : ''">
                yes
            </RouterLink>
            <span class="ml5 mr5">|</span>
            <RouterLink 
                :to="{}" 
                @click="setNeedUpgrade(0)"
                :class="props.item.needUpgrade==0 ? 'disable-link' : ''">
                no
            </RouterLink>
        </div>
        <div class="mb10">
            <span class="left text-center cardIcon">
                <i class="fa-solid fa-circle-arrow-right"></i>
            </span>
            <span class="left cardOption ml10 mr10">pending to arrive: </span>
            <RouterLink 
                :to="{}" 
                @click="setPendingYesNo(1)"
                :class="props.item.pendingToArrive==1 ? 'disable-link gold' : ''">
                yes
            </RouterLink>
            <span class="ml5 mr5">|</span>
            <RouterLink 
                :to="{}" 
                @click="setPendingYesNo(0)"
                :class="props.item.pendingToArrive==0 ? 'disable-link' : ''">
                no
            </RouterLink>
        </div>
        <div class="mb10">
            <span class="left text-center cardIcon">
                <i class="fa-solid fa-chess-rook"></i>
            </span>
            <span class="left cardOption ml10 mr10">own: </span>
            <RouterLink 
                :to="{}" 
                @click="setOwnYesNo(1)"
                :class="props.item.own==1 ? 'disable-link gold' : ''">
                yes
            </RouterLink>
            <span class="ml5 mr5">|</span>
            <RouterLink 
                :to="{}" 
                @click="setOwnYesNo(0)"
                :class="props.item.own==0 ? 'disable-link' : ''">
                no
            </RouterLink>
        </div>
    </td>
</template>

<style lang="css" scoped>
    .cardImg {
        width: 100px;
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
    }

    td:first-child {
        width: 20px;
        text-align: center;
    }
</style>