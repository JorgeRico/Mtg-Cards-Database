<template>
    <v-card flat class="pa-3 mt-2" style="overflow: hidden;">
        <v-card-text class="d-flex">
            <div cols="12" class="w-100">
                <h1>MTG Sets with Special Cards</h1>
                <div class="left w-100 mb-5 align-right">
                    <div class="right f18 w-400px">
                        <div class="left align-left w-80">
                            <strong>Total Sets: </strong>
                        </div>
                        <div class="right w-20">
                            <strong>{{ this.numSets }}</strong>
                        </div>
                        <div class="left align-left w-80">
                            <strong>Total Complete Sets: </strong>
                        </div>
                        <div class="right w-20">
                            <strong>{{ this.completeNumSets }}</strong>
                        </div>
                        <div class="left align-left w-80">
                            <strong>Total Cards: </strong>
                        </div>
                        <div class="right w-20">
                            <strong>{{ this.numTotalCards }}</strong>
                        </div>
                        <div class="left align-left w-80">
                            <strong>Total Cards Own: </strong>
                        </div>
                        <div class="right w-20">
                            <strong>{{ this.numTotalCardsOwn }}</strong>
                        </div>
                    </div>
                </div>
                <Pagination :page="page" :numPages="numPages" @clickPagination="clickLinkPagination($event)"></Pagination>
                <SetList :sets="sets"></SetList>
                <Spinner></Spinner>
                <ErrorApi></ErrorApi>
                <Pagination :page="page" :numPages="numPages" @clickPagination="clickLinkPagination($event)"></Pagination>
            </div>
        </v-card-text>
    </v-card>
</template>
  
<script>
import ErrorApi from '@/layouts/components/errors/ErrorApi.vue'
import SetList from '@/layouts/components/setList/SetList.vue';
import Spinner from '@/layouts/components/Spinner.vue'
import Pagination from '@/layouts/components/Pagination.vue'
import axios from "axios";

const urlSetList = import.meta.env.VITE_API_SERVER + import.meta.env.VITE_API_SPECIAL_SET_ENDPOINT;

const pagination = 100;

export default {
    components: {
        SetList,
        ErrorApi,
        Spinner,
        Pagination
    },
    data() {
        return {
            sets             : null,
            page             : 1,
            numPages         : 1,
            filters          : null,
            completeNumSets  : null,
            numTotalCards    : null,
            numTotalCardsOwn : null,
            numSets          : null
        }
    },
    methods: {
        async getPagination(param = null) {
            var url = this.getNumSetPaginationUrl(param);

            await axios
                .get(url)
                .then(response => {
                    this.numSets          = response.data.data[0].numTotal;
                    this.completeNumSets  = response.data.data[0].numTotalComplete;
                    this.numTotalCards    = response.data.data[0].numTotalCards;
                    this.numTotalCardsOwn = response.data.data[0].numTotalCardsOwn;

                    let totalPages = this.numSets / pagination;
                    totalPages     = Math.trunc(totalPages);

                    let total = this.numSets - (totalPages * pagination);
                    
                    if (total > 0) {
                        this.numPages = totalPages + 1;
                    } else {
                        this.numPages = totalPages;
                    }
                })
                .catch(error => {
                    this.show('errorApiFile');
                    setTimeout(() => this.hide('errorApiFile'), 2500);
                })
                .finally(() => this.loading = false)
        },
        async getSetInfo(url) {
            this.sets = null;

            await axios
                .get(url)
                .then(response => {
                    this.hide('spinner');
                    this.sets = response.data.data;
                })
                .catch(error => {
                    this.show('errorApiFile');
                    setTimeout(() => this.hide('errorApiFile'), 2500);
                })
                .finally(() => this.loading = false)
        },
        clickLinkPagination(data) {
            this.show('spinner');
            this.page = data;

            var url = this.getPaginationUrl();
            this.getSetInfo(url);
        },
        getPaginationUrl(){
            var url = urlSetList;
            
            if (this.page > 1) {
                url = url + '?page=' + this.page
                if (this.filters != null) {
                    url = url + '&filter=' + this.filters;
                }
            } else {
                if (this.filters != null) {
                    url = url + '?filter=' + this.filters;
                }
            }

            return url;
        },
        getNumSetPaginationUrl(param) {
            var url = urlSetList;

            if (param != null) {
                url = url + '/' + 'numSets' + param;
            } else {
                url = url + '/' + 'numSets';
            }

            return url;
        }
    },
    mounted() {
        this.show('spinner');
    },
    beforeMount() {
        this.redirectIfIsNotLogged();
        
        let urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('page') == true) {
            this.page = Number(urlParams.get('page'));
        }
        
        this.getPagination();           
        this.getSetInfo(urlSetList);
    }
}
</script>