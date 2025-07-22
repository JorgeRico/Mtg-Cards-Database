<script setup lang="ts">
    import BackofficeLayout from '@layouts/BackofficeLayout.vue';
    import Table from '@components/Backoffice/Card/Search/Table.vue';
    import { useRoute } from 'vue-router';
    import { ref } from 'vue';
    import { useToast } from 'vue-toastification';

    const toast = useToast();
    const route = useRoute();

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
    }

    const setItems = ref<CardData[]>([]);
    const total    = ref<number>(0);
    const cardName = ref<string>(route.query.cardName ? route.query.cardName.toString() : '');

    // get set list
    function getCards() {
        let url = import.meta.env.VITE_API_SERVER + import.meta.env.VITE_API_SEARCH_CARDS_ENDPOINT;
        url += '?cardName=' + cardName.value;
        
        fetch(url).then(async response => {
            const data     = await response.json();
            setItems.value = await data.data;
            total.value    = await data.data.length;

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response statusText
                const error = response.statusText;
                // return Promise.reject(error);
                toast.error(error)
            }
        })
        .catch(error => {
            // this.errorMessage = error;
            toast.error("There was an error!")
            console.error("There was an error!", error);
        });
    }

    // init
    const initialize = () => {
        getCards();
    };

    initialize();
    
</script>

<template>
    <BackofficeLayout>
        <h1>Search cards</h1>
        <p><strong>Name</strong>: <strong>{{ cardName }}</strong></p>
        <p><strong>Num cards</strong>: <strong>{{ total }}</strong></p>

        <Table
            :key=setItems 
            :items=setItems>
        </Table>
    </BackofficeLayout>
</template>

<style lang="css" scoped>

</style>