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
    
    // // get set list
    function getData() {
        let url = import.meta.env.VITE_API_SERVER + import.meta.env.VITE_API_PENDING_CARDS_ENDPOINT;

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
        getData();
    };

    initialize();
    
</script>

<template>
    <BackofficeLayout>
        <Table
            :key=setItems 
            :isPendingCard=true
            :items=setItems>
        </Table>
    </BackofficeLayout>
</template>

<style lang="css" scoped>

</style>