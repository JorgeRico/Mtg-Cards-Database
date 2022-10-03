<template>
    <v-card flat class="pa-3 mt-2" style="overflow: hidden;">
        <v-card-text class="d-flex">
            <div cols="12" class="w-100">
                <h1>MTG Sets</h1>
                <SetList :sets="sets"></SetList>
            </div>
        </v-card-text>
        <ApiError></ApiError>
    </v-card>
</template>
  
<script>
import ApiError from '@/layouts/components/ApiError.vue'
import SetList from '@/layouts/components/setlist/SetList.vue';

import axios from "axios";

const urlSetList = process.env.VUE_APP_API_SERVER + process.env.VUE_APP_API_SET_ENDPOINT;

import { getAuth } from "firebase/auth";

const auth = getAuth();

export default {
    components: {
        SetList,
        ApiError,
    },
    data() {
        return {
            sets: null,
            page: null,
        }
    },
    methods: {
        async getSetList() {
            await axios
                .get(urlSetList)
                .then(response => {
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
  