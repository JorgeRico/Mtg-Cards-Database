<template>
    <v-card flat class="pa-3 mt-2" style="overflow: hidden;">
        <v-card-text class="d-flex">
            <div cols="12" class="w-100">
                <h1>MTG Cards</h1>
                <SetCardsList :cardsList="cardsList"></SetCardsList>
            </div>
        </v-card-text>
    </v-card>
</template>
  
<script>
import SetCardsList from '@/layouts/components/setlist/SetCardsList.vue';
import axios from "axios";



import { getAuth } from "firebase/auth";
const auth = getAuth();

export default {
    components: {
        SetCardsList,
    },
    data() {
        return {
            setId: null,
            cardsList: [],
            urlSetCardsList: null,
        }
    },
    methods: {
        async getSetList() {
            await axios
                .get(this.urlSetCardsList)
                .then(response => {
                    this.cardsList = response.data.data;
                })
                .catch(error => {
                    console.log('error')
                    // this.show('errorApiFile');
                    // setTimeout(() => this.hide('errorApiFile'), 2500);
                })
                .finally(() => this.loading = false)
        },
    },
    mounted() {

    },
    beforeMount() {
        this.setId = this.$route.params.id;
        this.urlSetCardsList = process.env.VUE_APP_API_SERVER + process.env.VUE_APP_API_SET_CARDS_ENDPOINT + '/' + this.setId;
        this.getSetList();

        auth.onAuthStateChanged(function (user) {
            if (!user) { // not logged in
                window.location.href = "/";
            }
        })
    }
}
</script>
  