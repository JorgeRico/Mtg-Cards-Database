<script setup lang="ts">
    import BackofficeLayout from '@layouts/BackofficeLayout.vue';
    import Table from '@components/Backoffice/Card/CardSet/Table.vue';
    import Filters from '@components/Backoffice/Card/CardSet/Filters.vue';
    import Info from '@components/Backoffice/Card/CardSet/Info.vue';
    import { useRoute } from 'vue-router';
    import { ref } from 'vue';
    import { useToast } from 'vue-toastification';

    const toast = useToast();
    const route = useRoute();
    const id    = ref(route.params.id);

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
        oversizedCards  : number,
        onlineSet       : number
    }

    const setInfo    = ref<SetData>({ id: 0, setName: '', setReleaseDate: '', setTotalCards: 0, ownedCards: 0, setLogo: '', numCardsOnADeck: 0, numPendingCards: 0, complete: false, specialCards: 0,  backCards: 0, oversizedCards: 0, onlineSet: 0 });
    const setItems   = ref<CardData[]>([]);
    
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
    function getCards(orderBy?: string) {
        let url = import.meta.env.VITE_API_SERVER + import.meta.env.VITE_API_SET_CARDS_ENDPOINT + '/' + id.value;
        if (orderBy) {
            url += '?filter=' + orderBy;
        }

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

    function handleCustomFilterIdChange() {
        getCards('id');
    }
    function handleCustomFilterNameChange() {
        getCards('name');
    }
    function handleCustomFilterSetChange(option: number) {
        let text = "Are you sure?!\nEither OK or Cancel.";

        if (confirm(text) == true) {
            updateCards('complete', option);
        }
    }
    function handleCustomFilterAllCardsChange(option: number) {
        let text = "Are you sure?!\nEither OK or Cancel.";

        if (confirm(text) == true) {
            updateCards('own', option, true);
        }
    }
    function handleCustomFilterPendingCardsChange(option: number) {
        let text = "Are you sure?!\nEither OK or Cancel.";

        if (confirm(text) == true) {
            updateCards('pendingToArrive', option, true);
        }
    }

    function updateCards(key: string, value: number, isCard?: boolean) {
        let url = import.meta.env.VITE_API_SERVER;

        if (isCard) {
            url += import.meta.env.VITE_API_SET_CARDS_ENDPOINT + '/' + id.value + '/cards';
        } else {
            url += import.meta.env.VITE_API_SETS_ENDPOINT + '/' + id.value;
        }

        const requestOptions = {
            method  : 'PUT',
            headers : { 'Content-Type': 'application/json' },
            body    : JSON.stringify({ [key]: value})
        };

        fetch(url, requestOptions).then(async response => {
            const data = await response.json();
            console.log(data)
            getCards();
            getSetData();

            toast.success(data.message)
        })
        .catch(error => {
            console.error('There was an error!', error);
            toast.error('There was an error!');
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
        <div class="text-right mb40 right w100">
            <Filters
                @custom-filter-id-change="handleCustomFilterIdChange"
                @custom-filter-name-change="handleCustomFilterNameChange"
                @custom-filter-set-change="handleCustomFilterSetChange"
                @custom-filter-all-cards-change="handleCustomFilterAllCardsChange"
                @custom-filter-pending-cards-change="handleCustomFilterPendingCardsChange">
            </Filters>
        </div>
        <Table
            :key=setItems 
            :items=setItems>
        </Table>
    </BackofficeLayout>
</template>

<style lang="css" scoped>

</style>