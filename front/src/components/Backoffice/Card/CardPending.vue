<script setup lang="ts">
    import BackofficeLayout from '@layouts/BackofficeLayout.vue';
    import Table from '@components/Backoffice/Card/SingleCard/Table.vue';
    import { ref } from 'vue';
    import { useToast } from 'vue-toastification';

    const toast = useToast();

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
        let url = import.meta.env.VITE_API_SERVER + import.meta.env.VITE_API_PENDING_CARDS_ENDPOINT;

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
            toast.error('There was an error!');
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
        <h1>Cards pending to arrive</h1>
        <div class="left info d-flex justify-content-start gap-5 mt20 mb30">
            <div class="bubble">
                <span class="left w100 head">
                    <strong>Cards</strong>
                </span>
                <span class="left w100">
                    <span class="left">Num Total:</span>
                    <span class="right">{{ total }}</span>
                </span>
            </div>
        </div>
        <Table
            :key=setItems 
            :isPendingCard=true
            :isUpgrade=false
            :isOnADeck=false
            :items=setItems>
        </Table>
    </BackofficeLayout>
</template>

<style lang="css" scoped>

</style>