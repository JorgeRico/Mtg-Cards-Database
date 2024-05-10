<template>
    <div id="setResult" class="mt-10 w-100">
        <BackLink></BackLink>
        <div class="left w-100 pb20">
            <div class="left w50px pt5" v-html="setLogo"></div>
            <div class="w-90 right">
                <div class="left w-100 pt5">
                    <strong>Set name</strong>: <strong>{{ setName }}</strong>
                </div>
                <div class="left w-100 pt5">
                    <strong>Release date</strong>: <strong>{{ releaseDate }}</strong>
                </div>
                <div class="left w-100 pt5">
                    <strong>Num cards</strong>: <strong>{{ numCards }}</strong>
                </div>
                <div class="left w-100 pt5">
                    <strong>Num Special cards</strong>: <strong> {{ specialCards }} </strong>
                </div>
                <div class="left w-100 pt5">
                    <strong>Num Back side cards</strong>: <strong> {{ backCards }} </strong>
                </div>
                <div class="left w-100 pt5">
                    <strong>Num Oversized cards</strong>: <strong> {{ oversizedCards }} </strong>
                </div>
                <div class="left w-100 pt5">
                    <strong>Num Waiting to arrive cards</strong>: <strong>{{ numPendingCards }}</strong>
                </div>
                <div class="left w-100 pt5">
                    <strong>Num cards on Decks</strong>: <strong>{{ numCardsOnADeck }}</strong>
                </div>
                <div class="left w-100 pt5">
                    <strong>Owned cards</strong>: <strong>{{ ownCards }}</strong>
                </div>
                <div class="left w-100 pt5" v-if="complete==1">
                    <strong>Complete set</strong>: <strong>YES</strong>
                </div>
                <div class="left w-100 pt5" v-else>
                    <strong>Complete set</strong>: <strong>NO</strong>
                </div>
            </div>
        </div>
        <div class="right w-100 pb20">
            <div class="right dropdown">
                <button color="primary" class="btn btn-primary dropdown-toggle" @click="orderDropdown()">
                    Filter By
                </button>
                <div class="invisible" id="orderedDropdown-menu" ref="myElementOrdered">
                    <a class="dropdown-item" @click="orderById()">Order by DB Id</a>
                    <a class="dropdown-item" @click="orderByName()">Order by Name</a>
                </div>
            </div>
            <div class="right dropdown" style="margin-right: 20px">
                <button color="primary" class="btn btn-primary dropdown-toggle" @click="dropdown()">
                    Options
                </button>
                <div class="invisible" id="dropdown-menu" ref="myElement">
                    <a class="dropdown-item" @click="completeSet(1)">Mark Set as Complete</a>
                    <a class="dropdown-item" @click="completeSet(0)">Mark Set as UnComplete</a>
                    <a class="dropdown-item" @click="setAllCards(1)">Complete all (cards and set)</a>
                    <a class="dropdown-item" @click="setAllCards(0)">UnComplete all (cards and set)</a>
                    <a class="dropdown-item" @click="setAllPendingCards(1)">Mark all cards as "On Cart"</a>
                    <a class="dropdown-item" @click="setAllPendingCards(0)">Unmark all cards "On Cart"</a>
                </div>
            </div>
        </div>
        <div class="left w-100">
            <VTable class="border-grey mb-10">
                <thead>
                    <tr>
                        <th class="text-uppercase">
                            <p class="mb-0 center">
                                NUM
                            </p>
                        </th>
                        <th class="text-uppercase">
                            <p class="mb-0 center">
                                IMG
                            </p>
                        </th>
                        <th class="text-uppercase">
                            <p class="mb-0">
                                NAME
                            </p>
                        </th>
                        <th class="text-uppercase">
                            <p class="mb-0 center">
                                ON A DECK
                            </p>
                        </th>
                        <th class="text-uppercase">
                            <p class="mb-0 center">
                                WAITING TO ARRIVE
                            </p>
                        </th>
                        <th class="text-uppercase">
                            <p class="mb-0 center">
                                NEDD UPGRADE
                            </p>
                        </th>
                        <th class="text-uppercase">
                            <p class="mb-0 center">
                                OWN
                            </p>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, i) in cardsList" :key="i" :class="item.own == 1 ? 'complete' : ''">
                        <td class="text-uppercase">
                            <p class="mb-0" style="width: 30px" v-if="item.isOversized == 1">
                                <span class="special-img">{{ i+1 }}</span> 
                                <br>
                                <span class="ml20">
                                    <v-img
                                        contain
                                        class="specialCardImg greeting-card-trophy"
                                        :src="trophyImg"
                                    ></v-img>
                                </span>
                            </p>
                            <p class="mb-0" style="width: 30px" v-if="item.special == 1">
                                <span class="special-img">{{ i+1 }}</span> 
                                <br>
                                <span class="ml20">
                                    <v-img
                                        contain
                                        class="specialCardImg greeting-card-trophy"
                                        :src="trophyImg"
                                    ></v-img>
                                </span>
                            </p>
                            <p class="mb-0 center" style="width: 30px" v-if="item.isBackCard == 1">
                                <span class="special-img">{{ i+1 }}</span> 
                                <br>
                                <span class="ml20">
                                    <v-img
                                        contain
                                        class="specialCardImg greeting-card-trophy"
                                        :src="backCardImg"
                                    ></v-img>
                                </span>
                            </p>
                            <p class="mb-0 center" v-if="item.isBackCard == 0 && item.special == 0 && item.isOversized == 0">
                                {{ i+1 }}
                            </p>
                        </td>
                        <td class="text w100px">
                            <p class="mb-0 w100px" style="padding: 3px 0px;" :id="'img-'+i">
                                <v-img
                                    contain
                                    class="greeting-card-trophy w100px zoom"
                                    :src="item.cardImg.toLowerCase().trim()"
                                ></v-img>
                            </p>
                        </td>
                        <td class="text-uppercase">
                            <p class="mb-0">
                                {{ item.cardName }}
                            </p>
                        </td>
                        <td class="text-uppercase" v-if="item.isOnADeck==0">
                            <p class="mb-0 center">
                                <span @click="setIsOnADeck(item.id, 1)" class="pointer"><u>ADD to deck</u></span>
                            </p>
                        </td>
                        <td class="text-uppercase working" v-else>
                            <p class="mb-0 center">
                                <span @click="setIsOnADeck(item.id, 0)" class="pointer"><u>Delete from deck</u></span>
                            </p>
                        </td>

                        <td class="text-uppercase working" v-if="item.needUpgrade==1">
                            <p class="mb-0 center">
                                <span  @click="setNeedUpgrade(item.id, 0)" class="pointer"><u>Not Need upgrade</u></span>
                            </p>
                        </td>
                        <td class="text-uppercase" v-else>
                            <p class="mb-0 center">
                                <span @click="setNeedUpgrade(item.id, 1)" class="pointer"><u>Need upgrade</u></span>
                            </p>
                        </td>

                        <td class="text-uppercase" v-if="item.pendingToArrive==0">
                            <p class="mb-0 center">
                                <span  @click="setPendingYesNo(item.id, 1)" class="pointer"><u>Add to Cart</u></span>
                            </p>
                        </td>
                        <td class="text-uppercase working" v-else>
                            <p class="mb-0 center">
                                <span @click="setPendingYesNo(item.id, 0)" class="pointer"><u>Delete from cart</u></span>
                            </p>
                        </td>

                        <td class="text-uppercase">
                            <p class="mb-0 center">
                                <span v-if="item.own==0" @click="setOwnYesNo(item.id, 1)" class="pointer"><u>update to YES</u></span>
                                <span v-else @click="setOwnYesNo(item.id, 0)" class="pointer"><u>update to NO</u></span>
                            </p>
                        </td>
                    </tr>
                </tbody>
            </VTable>
            <ErrorApi></ErrorApi>
        </div>
        <BackLink></BackLink>
    </div>
    
</template>

<script>
import axios from "axios";
import qs from 'qs';
import ErrorApi from '@/layouts/components/errors/ErrorApi.vue';
import BackLink from '@/layouts/components/setCardsList/BackLink.vue';
import router from "@/router";
import trophyImg from '@/assets/images/misc/trophy.png'
import backCardImg from '@/assets/images/misc/backCard.png'

export default {
    components: {
        ErrorApi,
        BackLink
    },
    data() {
        return {
            cardsList       : null,
            complete        : null,
            setTotalCards   : null,
            numOwnedCards   : 0,
            setName         : '',
            releaseDate     : '',
            numCards        : '',
            ownCards        : '',
            setLogo         : '',
            numCardsOnADeck : null,
            numPendingCards : null,
            specialCards    : null,
            backCards       : null,
            oversizedCards  : null,
            orderedById     : false
        }
    },
    setup() {
        return {
            trophyImg: trophyImg,
            backCardImg: backCardImg
        }
    },
    props: {
        setId: {
            type: Number,
            default: null,
        },
    },
    methods: {
        orderDropdown() {
            const element = this.$refs.myElementOrdered;
            this.hide('dropdown-menu');
            if (element.classList.contains('invisible')) {
                this.show('orderedDropdown-menu');
            } else {
                this.hide('orderedDropdown-menu');
            }
        },
        dropdown() {
            const element = this.$refs.myElement;
            this.hide('orderedDropdown-menu');
            if (element.classList.contains('invisible')) {
                this.show('dropdown-menu');
            } else {
                this.hide('dropdown-menu');
            }
        },
        orderById(){
            this.orderedById = true;
            this.getSetCardList(this.orderedById);
        },
        orderByName() {
            this.orderedById = false;
            this.getSetCardList(this.orderedById);;
        },
        async getSetInfo() {
            await axios
                .get(import.meta.env.VITE_API_SERVER + import.meta.env.VITE_API_SET_ENDPOINT + '/' + this.setId)
                .then(response => {
                    var setInfo          = response.data.data;
                    this.setName         = setInfo[0].setName;
                    this.releaseDate     = setInfo[0].setReleaseDate;
                    this.numCards        = setInfo[0].setTotalCards;
                    this.ownCards        = setInfo[0].ownedCards;
                    this.setLogo         = setInfo[0].setLogo;
                    this.numCardsOnADeck = setInfo[0].numCardsOnADeck;
                    this.numPendingCards = setInfo[0].numPendingCards;
                    this.complete        = setInfo[0].complete;
                    this.specialCards    = setInfo[0].specialCards;
                    this.backCards       = setInfo[0].backCards;
                    this.oversizedCards  = setInfo[0].oversizedCards;
                })
                .catch(error => {
                    this.show('errorApiFile');
                    setTimeout(() => this.hide('errorApiFile'), 2500);
                })
                .finally(() => this.loading = false)
        },
        async getSetCardList(orderById) {
            if (!orderById) {
                var url = import.meta.env.VITE_API_SERVER + import.meta.env.VITE_API_SET_CARDS_ENDPOINT + '/' + this.setId
            } else {
                var url = import.meta.env.VITE_API_SERVER + import.meta.env.VITE_API_SET_CARDS_ENDPOINT + '/' + this.setId + '/order/id'
            }
            await axios
                .get(url)
                .then(response => {
                    this.cardsList = null;
                    this.cardsList = response.data.data;
                    this.getSetInfo();
                    this.hide('orderedDropdown-menu');
                    this.hide('dropdown-menu');
                })
                .catch(error => {
                    this.show('errorApiFile');
                    setTimeout(() => this.hide('errorApiFile'), 2500);
                })
                .finally(() => this.loading = false)
        },
        setOwnYesNo(id, value) {
            var url  = import.meta.env.VITE_API_SERVER + import.meta.env.VITE_API_SET_CARDS_ENDPOINT + '/' + this.setId + '/cards/' + id;
            var data = qs.stringify({ 'own': value });
            this.commonUpdateFunction(url, data)
        },
        setIsOnADeck(id, value) {
            var url  = import.meta.env.VITE_API_SERVER + import.meta.env.VITE_API_SET_CARDS_ENDPOINT + '/' + this.setId + '/cards/' + id;
            var data = qs.stringify({ 'isOnADeck': value });
            this.commonUpdateFunction(url, data)
        },
        setPendingYesNo(id, value) {
            var url  = import.meta.env.VITE_API_SERVER + import.meta.env.VITE_API_SET_CARDS_ENDPOINT + '/' + this.setId + '/cards/' + id;
            var data = qs.stringify({ 'pendingToArrive': value });
            this.commonUpdateFunction(url, data)
        },
        setNeedUpgrade(id, value) {
            var url  = import.meta.env.VITE_API_SERVER + import.meta.env.VITE_API_SET_CARDS_ENDPOINT + '/' + this.setId + '/cards/' + id;
            var data = qs.stringify({ 'needUpgrade': value });
            this.commonUpdateFunction(url, data)
        },
        completeSet(value) {
            var url  = import.meta.env.VITE_API_SERVER + import.meta.env.VITE_API_SET_ENDPOINT + '/' + this.setId;
            var data = qs.stringify({ 'complete': value });
            this.commonUpdateFunction(url, data)
        },
        setAllPendingCards(value) {
            var url  = import.meta.env.VITE_API_SERVER + import.meta.env.VITE_API_SET_CARDS_ENDPOINT + '/' + this.setId + '/cards';
            var data = qs.stringify({ 'pendingToArrive': value });
            this.commonUpdateFunction(url, data)
        },
        async setAllCards(value) {
            let text = "Are you sure?!\nEither OK or Cancel.";
            this.hide('dropdown-menu');
            if (confirm(text) == true) {
                var url  = import.meta.env.VITE_API_SERVER + import.meta.env.VITE_API_SET_CARDS_ENDPOINT + '/' + this.setId + '/cards';
                var data = qs.stringify({ 'own': value });
                this.commonUpdateFunction(url, data);
            }
        },
        async commonUpdateFunction(url, data) {
            this.hide('dropdown-menu');
            await axios({
                method  : 'put',
                url     : url,
                headers : { 'content-type': 'application/x-www-form-urlencoded' },
                data    : data,
            })
            .then(response => {
                this.getSetCardList(this.orderedById);;
            })
            .catch(error => {
                this.show('errorApiFile');
                setTimeout(() => this.hide('errorApiFile'), 2500);
            })
            .finally(() => this.loading = false)
        },
    },
    mounted() {
        this.getSetCardList(this.orderedById);;
        this.hide('dropdown-menu');
    },
    beforeMount() {

    }
}
</script>