<template>
    <div id="setResult" class="mt-10 w-100">
        <BackLink></BackLink>
        <div class="left w-50 pb-20">
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
                <strong>Owned cards</strong>: <strong>{{ ownCards }}</strong>
            </div>
        </div>
        <div class="right w-50 pb-20 complete-buttons">
            <v-btn color="primary" class="right me-3 mb-5">
                <span class="d-none d-sm-block" @click="setAllCards(1)">Complete all</span>
            </v-btn>
            <v-btn color="primary" class="right me-3 mb-5">
                <span class="d-none d-sm-block" @click="setAllCards(0)">UnComplete all</span>
            </v-btn>
        </div>
        <div class="left w-100">
            <v-simple-table class="border-grey mb-10">
                <template>
                    <thead>
                        <tr>
                            <th class="text-uppercase w-50px">
                                <p class="mb-0 center" cols="2">
                                    NUM
                                </p>
                            </th>
                            <th class="text-uppercase w-50px">
                                <p class="mb-0 center" cols="6">
                                    IMG
                                </p>
                            </th>
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
                            :class="item.own == 1 ? 'complete' : ''">
                            <td class="text-uppercase w-40">
                                <p class="mb-0 center" cols="6" v-if="item.special == 1">
                                    <span class="special-img">{{ i+1 }}</span> 
                                    <span class="ml-20">
                                        <v-img
                                            contain
                                            style="max-width: 30px; height: 30px; left: 35px; top: -13px;"
                                            class="greeting-card-trophy"
                                            src="@/assets/images/misc/trophy.png"
                                        ></v-img>
                                    </span>
                                </p>
                                <p class="mb-0 center" cols="6" v-else>
                                    {{ i+1 }}
                                </p>
                            </td>
                            <td class="text w-40">
                                <p class="mb-0 center" style="padding: 3px 0px" cols="6" :id="'img-'+i">
                                    <!--<a :href="item.cardImg.toLowerCase().trim()" target="_BLANK">show image</a>-->
                                    <v-img
                                        contain
                                        style="width: 100px; height: 100px;"
                                        class="greeting-card-trophy"
                                        :src="item.cardImg.toLowerCase().trim()"
                                    ></v-img>
                                </p>
                            </td>
                            <td class="text-uppercase w-40">
                                <p class="mb-0 center" cols="6">
                                    {{ item.cardName }}
                                </p>
                            </td>
                            <td class="text-uppercase w-40">
                                <p class="mb-0 center" cols="6">
                                    <span v-if="item.own==0" @click="setOwnYesNo(item.id, 1)" class="pointer"><u>update to
                                            YES</u></span>
                                    <span v-else @click="setOwnYesNo(item.id, 0)" class="pointer"><u>update to NO</u></span>
                                </p>
                            </td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
            <ApiError></ApiError>
        </div>
        <BackLink></BackLink>
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
            cardsList     : null,
            complete      : null,
            setTotalCards : null,
            numOwnedCards : 0,
            setName       : '',
            releaseDate   : '',
            numCards      : '',
            ownCards      : '',
        }
    },
    setup() {
        return {
        }
    },
    props: {
        setId: {
            type: Number,
            default: null,
        },
    },
    methods: {
        async getSetInfo() {
            await axios
                .get(process.env.VUE_APP_API_SERVER + process.env.VUE_APP_API_SET_ENDPOINT + '/' + this.setId)
                .then(response => {
                    var setInfo      = response.data.data;
                    this.setName     = setInfo[0].setName;
                    this.releaseDate = setInfo[0].setReleaseDate;
                    this.numCards    = setInfo[0].setTotalCards;
                    this.ownCards    = setInfo[0].ownedCards;
                })
                .catch(error => {
                    this.show('errorApiFile');
                    setTimeout(() => this.hide('errorApiFile'), 2500);
                })
                .finally(() => this.loading = false)
        },
        async getSetCardList() {
            await axios
                .get(process.env.VUE_APP_API_SERVER + process.env.VUE_APP_API_SET_CARDS_ENDPOINT + '/' + this.setId)
                .then(response => {
                    this.cardsList = null;
                    this.cardsList = response.data.data;
                    this.getSetInfo();
                })
                .catch(error => {
                    this.show('errorApiFile');
                    setTimeout(() => this.hide('errorApiFile'), 2500);
                })
                .finally(() => this.loading = false)
        },
        async setOwnYesNo(id, value) {
            await axios({
                method  : 'put',
                url     : process.env.VUE_APP_API_SERVER + process.env.VUE_APP_API_SET_CARDS_ENDPOINT + '/' + this.setId + '/cards/' + id,
                headers : { 'content-type': 'application/x-www-form-urlencoded' },
                data    : qs.stringify({ 'own': value }),
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
        async setAllCards(value) {
            let text = "Are you sure?!\nEither OK or Cancel.";
            if (confirm(text) == true) {
                await axios({
                    method  : 'put',
                    url     : process.env.VUE_APP_API_SERVER + process.env.VUE_APP_API_SET_CARDS_ENDPOINT + '/' + this.setId + '/cards',
                    headers : { 'content-type': 'application/x-www-form-urlencoded' },
                    data    : qs.stringify({ 'own': value }),
                })
                .then(response => {
                    this.getSetCardList();
                })
                .catch(error => {
                    this.show('errorApiFile');
                    setTimeout(() => this.hide('errorApiFile'), 2500);
                })
                .finally(() => this.loading = false)
            }
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
    mounted() {
        this.getSetCardList();
    },
    beforeMount() {
        this.setId = Number(this.$route.params.id);
        this.getSetInfo();
    }
}
</script>