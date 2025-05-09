<script setup lang="ts">
    import BackofficeLayout from '@layouts/BackofficeLayout.vue';
    import Table from '@components/Backoffice/Card/Table/Table.vue';
    import Info from '@components/Backoffice/Card/Table/Info.vue';
    import { useRoute } from 'vue-router'
    import { ref } from 'vue'

    const route = useRoute()
    const id    = ref(route.params.id)

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
        isOversized     : number
    }

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

    const setInfo    = ref<SetData>({ id: 0, setName: '', setReleaseDate: '', setTotalCards: 0, ownedCards: 0, setLogo: '', numCardsOnADeck: 0, numPendingCards: 0, complete: false, specialCards: 0,  backCards: 0, oversizedCards: 0 });
    const setItems   = ref<CardData[]>([]);
    // const filters    = ref<Number>(0);
    
    // get set list
    function getSetData() {
        let url = import.meta.env.VITE_API_SERVER + import.meta.env.VITE_API_SETS_ENDPOINT + '/' + id.value;

        fetch(url).then(async response => {
            const data    = await response.json();
            setInfo.value = await data.data[0];

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response statusText
                const error = response.statusText;
                return Promise.reject(error);
            }
        })
        .catch(error => {
            // this.errorMessage = error;
            console.error("There was an error!", error);
        });
    }

    // get set list
    function getCards() {
        let url = import.meta.env.VITE_API_SERVER + import.meta.env.VITE_API_SET_CARDS_ENDPOINT + '/' + id.value;

        fetch(url).then(async response => {
            const data     = await response.json();
            setItems.value = await data.data;

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response statusText
                const error = response.statusText;
                return Promise.reject(error);
            }
        })
        .catch(error => {
            // this.errorMessage = error;
            console.error("There was an error!", error);
        });
    }

    // init
    const initialize = () => {
        getCards();
        getSetData();
    };

    initialize();
</script>

<template>
    <BackofficeLayout>
        <Info 
            :key=setInfo
            :item=setInfo>
        </Info>
        <Table 
            :key=setItems 
            :items=setItems>
        </Table>
    </BackofficeLayout>
</template>

<style lang="css" scoped>

</style>