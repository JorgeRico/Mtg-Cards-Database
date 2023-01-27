<template>
    <v-card flat class="pa-3 mt-2" style="overflow: hidden;">
        <v-card-text class="d-flex">
            <div cols="12" class="w-100">
                <h1>MTG Sets</h1>
                <div class="left w-100 mb-5 align-right">
                    <button class="btn btn-primary mr-5" @click="clickButton(0)">All sets</button>
                    <button class="btn btn-success mr-5" @click="clickButton(1)">Complete sets</button>
                    <button class="btn btn-warning mr-5" @click="clickButton(2)">Working sets</button>
                    <button class="btn btn-danger" @click="clickButton(3)">Not started sets</button>
                </div>
                <SetList :sets="sets"></SetList>
            </div>
        </v-card-text>
        <v-card-text class="d-flex">
            <div cols="12" class="w-100">
                <Spinner></Spinner>
            </div>
        </v-card-text>
        <ApiError></ApiError>
    </v-card>
</template>
  
<script>
import ApiError from '@/layouts/components/ApiError.vue'
import SetList from '@/layouts/components/setlist/SetList.vue';
import Spinner from '@/layouts/components/Spinner.vue'
import axios from "axios";

const urlSetList = process.env.VUE_APP_API_SERVER + process.env.VUE_APP_API_SET_ENDPOINT;

import { getAuth } from "firebase/auth";

const auth = getAuth();

export default {
    components: {
        SetList,
        ApiError,
        Spinner
    },
    data() {
        return {
            sets: null,
            page: null,
        }
    },
    methods: {
        async clickButton(value) {
            this.sets = null;
            this.show('spinner');
            await axios
                .get(urlSetList + '?filter=' + value)
                .then(response => {
                    this.hide('spinner');
                    this.sets = response.data.data;
                })
                .catch(error => {
                    console.log('error')
                    this.show('errorApiFile');
                    setTimeout(() => this.hide('errorApiFile'), 2500);
                })
                .finally(() => this.loading = false)
        },
        async getSetList() {
            await axios
                .get(urlSetList)
                .then(response => {
                    this.hide('spinner');
                    this.sets = response.data.data;
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
    mounted() {
        this.show('spinner');
    },
    beforeMount() {
        this.getSetList();

        auth.onAuthStateChanged(function (user) {
            if (!user) { // not logged in
                window.location.href = "/";
            }
        })
    }
}
</script>
  