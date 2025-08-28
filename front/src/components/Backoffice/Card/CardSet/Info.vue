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
        oversizedCards  : number,
        onlineSet       : number
    }
    
    import { useToast } from 'vue-toastification';

    const toast = useToast();

    const props = defineProps<{
        item: SetData
    }>()

    function setIsOnline(value: number) {
        updateCardDataInfo('onlineSet', value);
    }

    function updateCardDataInfo(key: string, value: number) {
        var url  = import.meta.env.VITE_API_SERVER + import.meta.env.VITE_API_SETS_ENDPOINT + '/' + props.item.id;

        const requestOptions = {
            method  : 'PUT',
            headers : { 'Content-Type': 'application/json' },
            body    : JSON.stringify({ [key]: value})
        };

        fetch(url, requestOptions).then(async response => {
            const data = await response.json();
            console.log(data)

            props.item.onlineSet = value;
            
            toast.success('Successfully updated')
        })
        .catch(error => {
            console.error('There was an error!', error);
            toast.error('There was an error!');
        });
    }
</script>

<template>
    <h1>{{ props.item.setName }}</h1>
    <p class="mb0"><strong>idSet:</strong> {{ props.item.id }}</p>
    <p><strong>Release date</strong>: {{ props.item.setReleaseDate }}</p>

    <p><strong>Online set</strong>: 
        <RouterLink 
            :to="{}" 
            @click="setIsOnline(1)"
            :class="props.item.onlineSet==1 ? 'disable-link gold' : ''">
            yes
        </RouterLink>
        <span class="ml5 mr5">|</span>
        <RouterLink 
            :to="{}" 
            @click="setIsOnline(0)"
            :class="props.item.onlineSet==0 ? 'disable-link' : ''">
            no
        </RouterLink>
    </p>
    
    <p class="mb0"><strong>Num cards</strong>: <strong>{{ props.item.setTotalCards }}</strong></p>
    <p class="mb0"><strong>Num Special cards</strong>: <strong> {{ props.item.specialCards }} </strong></p>
    <p class="mb0"><strong>Num Back side cards</strong>: <strong> {{ props.item.backCards }} </strong></p>
    <p class="mb0"><strong>Num Oversized cards</strong>: <strong> {{ props.item.oversizedCards }} </strong></p>
    <p class="mb0"><strong>Num Waiting to arrive cards</strong>: <strong>{{ props.item.numPendingCards }}</strong></p>
    <p class="mb0"><strong>Num cards on Decks</strong>: <strong>{{ props.item.numCardsOnADeck }}</strong></p>
    <p><strong>Owned cards</strong>: <strong>{{ props.item.ownedCards }}</strong></p>

    <p v-if="props.item.complete==true" class="completeSet">
        <strong>Complete set</strong>: <strong>YES</strong>
    </p>
    <p v-else class="uncompleteSet">
        <strong>Complete set</strong>: <strong>NO</strong>
    </p> 
</template>

<style lang="css" scoped>
    .completeSet {
        color: seagreen;
        text-shadow: 8px 1px 15px black;
        font-size: 20px;
    }

    .uncompleteSet {
        color: red;
        text-shadow: 8px 1px 15px black;
        font-size: 20px;
    }
</style>