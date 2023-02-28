<template>
    <div id="setResult" class="mt-10 w-100">
        <div class="left w-100 mb20 f16">
            <span v-if="isOnACart==true"><strong>Total Pending cards: {{ total }}</strong></span>
            <span v-if="isOnADeck==true"><strong>Total on use cards: {{ total }}</strong></span>
        </div>
        <div class="left w-100">
            <VTable class="border-grey mb-10">
                <thead>
                    <tr>
                        <th class="text-uppercase w25px">
                            <p class="mb-0">
                                &nbsp;
                            </p>
                        </th>
                        <th class="text-uppercase">
                            <p class="mb-0 center">
                                IMG
                            </p>
                        </th>
                        <th class="text-uppercase">
                            <p class="mb-0">
                                SET
                            </p>
                        </th>
                        <th class="text-uppercase">
                            <p class="mb-0">
                                NAME
                            </p>
                        </th>
                        <th class="text-uppercase w200px" v-if="isOnACart==true">
                            <p class="mb-0">
                                IS ON A CART
                            </p>
                        </th>
                        <th class="text-uppercase w200px" v-if="isOnADeck==true">
                            <p class="mb-0">
                                DELETE FROM A DECK
                            </p>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item) in cardsList">
                        <td class="text-uppercase">
                            <div class="w40px ml40" v-html="item.setLogo"></div>
                        </td>
                        <td class="text-uppercase">
                            <v-img
                                contain
                                class="greeting-card-trophy zoom"
                                :src="item.cardImg.toLowerCase().trim()"
                            ></v-img>
                        </td>
                        <td class="text-uppercase">                            
                            <router-link :to="{ name: 'setcards', params: { 'id': item.idSet } }">
                                {{ item.setName }}
                            </router-link>
                        </td>
                        <td class="text-uppercase">
                            <p class="mb-0">
                                {{ item.cardName }}
                            </p>
                        </td>
                        <td class="text-uppercase" v-if="isOnACart==true">
                            <p class="mb-0">
                                <span @click="setPendingYesNo(item.id, item.idSet, 0)" class="pointer"><u>Delete from cart</u></span>
                            </p>
                        </td>
                        <td class="text-uppercase" v-if="isOnADeck==true">
                            <p class="mb-0">
                                <span @click="setIsOnADeck(item.id, item.idSet, 0)" class="pointer"><u>Delete from deck</u></span>
                            </p>
                        </td>
                    </tr>
                </tbody>
            </VTable>
            <ErrorApi></ErrorApi>
        </div>
    </div>
    
</template>

<script>
import axios from "axios";
import qs from 'qs';
import ErrorApi from '@/layouts/components/errors/ErrorApi.vue';

export default {
    components: {
        ErrorApi,
    },
    props: {
        isOnACart: {
            type: Boolean,
            default: false,
        },
        isOnADeck: {
            type: Boolean,
            default: false,
        },
    },
    data () {
        return {
            cardsList : null,
            total     : null
        }
    },
    methods: {
        async getSetCardList() {
            if (this.isOnADeck == true) {
                var url = import.meta.env.VITE_API_SERVER + import.meta.env.VITE_API_SET_CARDS_ON_DECKS_ENDPOINT
            }
            if (this.isOnACart == true) {
                var url = import.meta.env.VITE_API_SERVER + import.meta.env.VITE_API_PENDING_CARDS_ENDPOINT
            }
            await axios
                .get(url)
                .then(response => {
                    this.cardsList = response.data.data;
                    this.total = this.cardsList.length;
                })
                .catch(error => {
                    this.show('errorApiFile');
                    setTimeout(() => this.hide('errorApiFile'), 2500);
                })
                .finally(() => this.loading = false)
        },
        setIsOnADeck(id, idSet, value) {
            var url  = import.meta.env.VITE_API_SERVER + import.meta.env.VITE_API_SET_CARDS_ENDPOINT + '/' + idSet + '/cards/' + id;
            var data = qs.stringify({ 'isOnADeck': value });
            this.commonUpdateFunction(url, data)
        },
        setPendingYesNo(id, idSet, value) {
            var url  = import.meta.env.VITE_API_SERVER + import.meta.env.VITE_API_SET_CARDS_ENDPOINT + '/' + idSet + '/cards/' + id;
            var data = qs.stringify({ 'pendingToArrive': value });
            this.commonUpdateFunction(url, data)
        },
        async commonUpdateFunction(url, data) {
            await axios({
                method  : 'put',
                url     : url,
                headers : { 'content-type': 'application/x-www-form-urlencoded' },
                data    : data,
            })
            .then(response => {
                this.getSetCardList();
            })
            .catch(error => {
                this.show('errorApiFile');
                setTimeout(() => this.hide('errorApiFile'), 2500);
            })
            .finally(() => this.loading = false)
        },
    },
    mounted() {
        
    },
    beforeMount() {
        this.getSetCardList();
    }
}
</script>