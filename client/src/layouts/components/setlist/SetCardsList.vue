<template>
    <div id="setResult" class="mt-10 w-100">
        <div class="left w-100">
            <BackLink></BackLink>
            <v-btn color="primary" class="right me-3 mb-5">
                <span class="d-none d-sm-block" @click="setAllCards">Complete all</span>
            </v-btn>
        </div>
        <div class="left w-100">
            <v-simple-table class="border-grey mb-10">
                <template>
                    <thead>
                        <tr>
                            <th class="text-uppercase w-50px">
                                <p class="mb-0 center" cols="6">
                                    NAME
                                </p>
                            </th>
                            <th class="text-uppercase w-50px">
                                <p class="mb-0 center" cols="6">
                                    OWN
                                </p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, i) in cardsList" :key="i"
                            :style="item.own == 1 ? 'background: #28a745' : ''">

                            <td class="text-uppercase w-40">
                                <p class="mb-0 center" cols="6">
                                    {{ item.cardName }}
                                </p>
                            </td>
                            <td class="text-uppercase w-40">
                                <p class="mb-0 center" cols="6">
                                    <span v-if="item.own==0" @click="setOwnYes(item.id)" class="pointer"><u>update to
                                            YES</u></span>
                                    <span v-else @click="setOwnNo(item.id)" class="pointer"><u>update to NO</u></span>
                                </p>
                            </td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </div>
        <div class="left w-100">
            <BackLink></BackLink>
        </div>
        <ApiError></ApiError>
    </div>
</template>

<style>
.pointer {
    cursor: pointer;
}
</style>

<script>
import axios from "axios";
import qs from 'qs';
import ApiError from '@/layouts/components/ApiError.vue'
import BackLink from '@/layouts/components/setlist/BackLink.vue'

export default {
    components: {
        ApiError,
        BackLink
    },
    data() {
        return {
            setId: null,
            // set: null,
            complete: null,
            setTotalCards: null,
            numOwnedCards: 0,
        }
    },
    setup() {
        return {
        }
    },
    props: {
        set: {
            type: Object,
            default: null,
        },
        cardsList: {
            type: Array,
            default: [],
        },
    },
    methods: {
        async setOwnYes(id) {
            var urlSetCardYes = process.env.VUE_APP_API_SERVER + process.env.VUE_APP_API_SET_CARDS_ENDPOINT + '/' + this.setId + '/cards/' + id;

            await axios({
                method: 'put',
                url: urlSetCardYes,
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                data: qs.stringify({ 'own': '1' }),
            })
                .then(response => {
                    this.getSetInfoToCheckNumCardsReload();
                })
                .catch(error => {
                    console.log('error')
                    this.show('errorApiFile');
                    setTimeout(() => this.hide('errorApiFile'), 2500);
                })
                .finally(() => this.loading = false)

        },
        async setOwnNo(id) {
            var urlSetCardYes = process.env.VUE_APP_API_SERVER + process.env.VUE_APP_API_SET_CARDS_ENDPOINT + '/' + this.setId + '/cards/' + id;

            await axios({
                method: 'put',
                url: urlSetCardYes,
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                data: qs.stringify({ 'own': '0' }),
            })
                .then(response => {
                    console.log(this.complete)
                    this.getSetInfoToCheckCompleteReload();
                })
                .catch(error => {
                    console.log('error')
                    this.show('errorApiFile');
                    setTimeout(() => this.hide('errorApiFile'), 2500);
                })
                .finally(() => this.loading = false)
        },
        completeAll() {
            let text = "Are you sure?!\nEither OK or Cancel.";
            if (confirm(text) == true) {
                text = true;
                this.setAllCards();
            } else {
                text = false;
            }
        },

        async setAllCards() {
            var urlSetAllCards = process.env.VUE_APP_API_SERVER + process.env.VUE_APP_API_SET_CARDS_ENDPOINT + '/' + this.setId + '/cards';

            await axios({
                method: 'put',
                url: urlSetAllCards,
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                data: qs.stringify({ 'own': '1' }),
            })
                .then(response => {
                    this.setComplete('1');
                })
                .catch(error => {
                    console.log('error')
                    this.show('errorApiFile');
                    setTimeout(() => this.hide('errorApiFile'), 2500);
                })
                .finally(() => this.loading = false)
        },
        async setComplete(value) {
            var urlSetComplete = process.env.VUE_APP_API_SERVER + process.env.VUE_APP_API_SET_ENDPOINT + '/' + this.setId;

            await axios({
                method: 'put',
                url: urlSetComplete,
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                data: qs.stringify({ 'complete': value }),
            })
                .then(response => {
                    location.reload();
                })
                .catch(error => {
                    console.log('error')
                    this.show('errorApiFile');
                    setTimeout(() => this.hide('errorApiFile'), 2500);
                })
                .finally(() => this.loading = false)
        },
        // setSetInfo() {
        //     this.complete = this.set.complete;
        //     this.setTotalCards = this.set.setTotalCards;
        // },
        getNumCards() {
            this.numOwnedCards = 0;
            for (var i = 0; i < this.cardsList.length; i++) {
                if (this.cardsList[i].own == 1) {
                    this.numOwnedCards++;
                }
            }
        },
        async getSetInfoToCheckCompleteReload() {
            var urlSet = process.env.VUE_APP_API_SERVER + process.env.VUE_APP_API_SET_ENDPOINT + '/' + this.setId;

            await axios
                .get(urlSet)
                .then(response => {
                    var set = response.data.data;
                    if (set[0].complete == 1) {
                        this.setComplete('0');
                    } else {
                        location.reload();
                    }
                })
                .catch(error => {
                    console.log('error')
                    this.show('errorApiFile');
                    setTimeout(() => this.hide('errorApiFile'), 2500);
                })
                .finally(() => this.loading = false)
        },
        async getSetInfoToCheckNumCardsReload() {
            var urlSet = process.env.VUE_APP_API_SERVER + process.env.VUE_APP_API_SET_ENDPOINT + '/' + this.setId;

            await axios
                .get(urlSet)
                .then(response => {
                    var set = response.data.data;
                    this.getNumCards()
                    if (set[0].setTotalCards == parseInt(this.numOwnedCards) + 1) {
                        this.setComplete('1');
                    } else {
                        location.reload();
                    }
                })
                .catch(error => {
                    console.log('error')
                    this.show('errorApiFile');
                    setTimeout(() => this.hide('errorApiFile'), 2500);
                })
                .finally(() => this.loading = false)
        },
        show(id) {
            var element = document.getElementById(id);
            element.classList.remove("invisible");
            element.classList.add("visible");
        },
        hide(id) {
            var element = document.getElementById(id);
            element.classList.remove("visible");
            element.classList.add("invisible");
        },
    },
    beforeMount() {
        this.setId = this.$route.params.id;
    }
}
</script>