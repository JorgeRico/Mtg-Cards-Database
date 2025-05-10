<script setup lang="ts">
    import BackofficeLayout from '@layouts/BackofficeLayout.vue';
    import Table from '@components/Backoffice/Card/SingleCard/Table.vue';
    import { ref } from 'vue';

    interface CardData {
        id              : number,
        idSet           : number,
        cardName        : string,
        cardImg         : string,
        special         : number,
        setName         : string,
        setLogo         : string,
        own             : number,
        isOnADeck       : number,
        pendingToArrive : number
    }

    const setItems = ref<CardData[]>([]);
    const total    = ref<number>(0);

    // // get set list
    function getData() {
        let url = import.meta.env.VITE_API_SERVER + import.meta.env.VITE_API_SET_CARDS_ON_DECKS_ENDPOINT;

        fetch(url).then(async response => {
            const data     = await response.json();
            setItems.value = await data.data;
            total.value    = await data.data.length;

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
        getData();
    };

    initialize();
    
</script>

<template>
    <BackofficeLayout>
        <h1>Cards on decks</h1>
        <p class="mb40"><strong>num cards:</strong> {{ total }}</p>
        <Table
            :key=setItems 
            :isPendingCard=false
            :items=setItems>
        </Table>
    </BackofficeLayout>
</template>

<style lang="css" scoped>

</style>