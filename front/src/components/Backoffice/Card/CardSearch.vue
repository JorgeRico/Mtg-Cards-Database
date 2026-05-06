<script setup lang="ts">
    import BackofficeLayout from '@layouts/BackofficeLayout.vue';
    import Table from '@components/Backoffice/Card/Search/Table.vue';
    import { ref } from 'vue';
    import { useToast } from 'vue-toastification';

    const toast = useToast();

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

    const setItems    = ref<CardData[]>([]);
    const total       = ref<number>(0);
    const searchCards = ref('');
    const result      = ref('');

    // get set list
    function getCards() {
        if (searchCards.value.trim() === '') {
            toast.error("Please, enter a card name");
            return;
        }

        let url = import.meta.env.VITE_API_SERVER + import.meta.env.VITE_API_SEARCH_CARDS_ENDPOINT;
        url += '?cardName=' + searchCards.value;
        
        fetch(url).then(async response => {
            const data     = await response.json();
            setItems.value = await data.data;
            total.value    = await data.data.length;
            result.value   = searchCards.value

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response statusText
                const error = response.statusText;
                // return Promise.reject(error);
                toast.error(error)
            }
        })
        .catch(error => {
            toast.error("There was an error!")
            console.error("There was an error!", error);
        });
    }
</script>

<template>
    <BackofficeLayout>
        <h1>Search cards</h1>

        <section class="search mb-3 mt20">
            <input 
                class="left"
                placeholder="Search cards...."
                v-model="searchCards"
                type="input" 
                @keyup.enter="getCards()"
            />
            <span class="left text-center pointer" @click="getCards()">
                <i class="fa-solid fa-search"></i>
            </span>
        </section>
        <p>Write a card name to search . . . </p>
        <hr>
        <section v-if="total > 0">
            <p>
                <strong>Name</strong>: <strong>{{ result }}</strong>
            </p>
            <p>
                <strong>Num cards</strong>: <strong>{{ total }}</strong>
            </p>
            <Table
                :key=setItems 
                :items=setItems>
            </Table>
        </section>
        <section v-else>No results found or anything is searched</section>
    </BackofficeLayout>
</template>

<style lang="css" scoped>
    .search {
        overflow: hidden;
        border: 1px solid grey;
        width: 220px;
        padding: 8px 7px 7px 6px;
        background: rgba(47, 105, 210, 0.2);
        border-radius: 3px;

        & input {
            padding: 4px 8px;
        }

        & span {
            margin-left: 8px;
            margin-top: 5px;
        }
    }
</style>