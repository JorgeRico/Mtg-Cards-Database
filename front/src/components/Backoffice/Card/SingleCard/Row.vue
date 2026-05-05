<script setup lang="ts">
    import { ref } from 'vue';
    import { useToast } from 'vue-toastification';

    const toast     = useToast()
    const className = ref<String>('warning');

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

    const props = defineProps<{
        item          : CardData,
        index         : number,
        isPendingCard : boolean,
        isUpgrade     : boolean,
        isOnADeck     : boolean
    }>()

    function changeOptionValue(value: number) {
        if (props.isPendingCard == true) {
            updateCardDataInfo('pendingToArrive', value);
        }
        if (props.isUpgrade == true) {
            updateCardDataInfo('needUpgrade', value);
        }
        if (props.isOnADeck == true) {
            updateCardDataInfo('isOnADeck', value);
        }
    }

    function updateCardDataInfo(key: string, value: number) {
        var url  = import.meta.env.VITE_API_SERVER + import.meta.env.VITE_API_SET_CARDS_ENDPOINT + '/' + props.item.idSet + '/cards/' + props.item.id;

        const requestOptions = {
            method  : 'PUT',
            headers : { 'Content-Type': 'application/json' },
            body    : JSON.stringify({ [key]: value})
        };

        fetch(url, requestOptions).then(async response => {
            const data      = await response.json();
            className.value = 'hide';

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = response.status;
                toast.error(data.message);
                return Promise.reject(error);
            } else {
                toast.success(data.message)
            }
        })
        .catch(error => {
            console.error('There was an error!', error);
            toast.error('There was an error!');
        });
    }
</script>

<template>
    <td :class=className>
        {{ props.index+1 }}
    </td>
    <td :class="`${className} cardImgTd`">
        <img :src="props.item.cardImg.toLowerCase().trim()" class="cardImg"/>
    </td>
    <td :class=className>
        <span>
            {{ props.item.cardName }}
        </span>
    </td>
    <td :class=className>
        <span>
            <RouterLink :to="{ name: 'setCards', params: { id: props.item.idSet }}">{{ props.item.setName }}</RouterLink>
        </span>
    </td>
    <td :class=className>
        <span>
            <RouterLink :to="{}" @click="changeOptionValue(0)">
                <span v-if="props.isPendingCard == true">Pending to arrive</span>
                <span v-if="props.isOnADeck == true">Card on a deck</span>
                <span v-if="props.isUpgrade == true">Card needs upgrade</span>
            </RouterLink>
        </span>
    </td>
</template>

<style lang="css" scoped>
    .cardImg, .cardImgTd {
        width: 100px;
        padding: 5px;
    }

    td:first-child {
        width: 20px;
        text-align: center;
    }

    td {
        padding: 20px 0 10px 0;

        & span {
            margin-left: 10px;
        }
    }
</style>