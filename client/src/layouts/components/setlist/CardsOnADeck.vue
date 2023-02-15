<template>
    <div id="setResult" class="mt-10 w-100">
        <div class="left w-100">
            <v-simple-table class="border-grey mb-10">
                <template>
                    <thead>
                        <tr>
                            <th class="text-uppercase w-100px">
                                <p class="mb-0 ml-35 align-left">
                                    IMG
                                </p>
                            </th>
                            <th class="text-uppercase">
                                <p class="mb-0 align-left">
                                    SET
                                </p>
                            </th>
                            <th class="text-uppercase w-49">
                                <p class="mb-0">
                                    NAME
                                </p>
                            </th>
                            <th class="text-uppercase w-200px">
                                <p class="mb-0">
                                    DELETE FROM A DECK
                                </p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item) in cardsList">
                            <td class="text-uppercase">
                                <p class="mb-0 w-100px" style="padding: 3px 0px;">
                                    <v-img
                                        contain
                                        style="height: 100px;"
                                        class="greeting-card-trophy w-100px"
                                        :src="item.cardImg.toLowerCase().trim()"
                                    ></v-img>
                                </p>
                            </td>
                            <td class="text-uppercase">
                                <div class="left w-25px" v-html="item.setLogo"></div>
                                <p class="right w-90 mb-0">
                                    <router-link :to="{ name: 'setcards', params: { 'id': item.idSet } }">
                                        {{ item.setName }}
                                    </router-link>
                                </p>
                            </td>
                            <td class="text-uppercase">
                                <p class="mb-0">
                                    {{ item.cardName }}
                                </p>
                            </td>
                            <td class="text-uppercase">
                                <p class="mb-0">
                                    <span @click="setIsOnADeck(item.id, item.idSet, 0)" class="pointer"><u>Delete from deck</u></span>
                                </p>
                            </td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
            <ApiError></ApiError>
        </div>
    </div>
    
</template>

<script>
import axios from "axios";
import qs from 'qs';
import ApiError from '@/layouts/components/ApiError.vue';
import helper from "@/mixins/helper";

export default {
    mixins: [helper],
    components: {
        ApiError,
    },
    data () {
        return {
            cardsList : null,
        }
    },
    methods: {
        async getSetCardList() {
            await axios
                .get(process.env.VUE_APP_API_SERVER + process.env.VUE_APP_API_SET_CARDS_ON_DECKS_ENDPOINT)
                .then(response => {
                    this.cardsList = response.data.data;
                })
                .catch(error => {
                    this.show('errorApiFile');
                    setTimeout(() => this.hide('errorApiFile'), 2500);
                })
                .finally(() => this.loading = false)
        },
        setIsOnADeck(id, idSet, value) {
            var url  = process.env.VUE_APP_API_SERVER + process.env.VUE_APP_API_SET_CARDS_ENDPOINT + '/' + idSet + '/cards/' + id;
            var data = qs.stringify({ 'isOnADeck': value });
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