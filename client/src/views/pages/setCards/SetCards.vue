<template>
    <v-card flat class="pa-3 mt-2" style="overflow: hidden;">
        <v-card-text class="d-flex">
            <div cols="12" class="w-100">
                <h1>MTG Cards</h1>
                <SetCardsList :setId="setId"></SetCardsList>
            </div>
        </v-card-text>
    </v-card>
</template>
  
<script>
import SetCardsList from '@/layouts/components/setCardsList/SetCardsList.vue';

import { getAuth } from "firebase/auth";
const auth = getAuth();

export default {
    components: {
        SetCardsList,
    },
    data() {
        return {
            setId: null,
        }
    },
    methods: {

    },
    mounted() {

    },
    beforeMount() {
        auth.onAuthStateChanged(function (user) {
            if (!user) { // not logged in
                window.location.href = "/";
            }
        })

        this.setId = Number(this.$route.params.id);
    }
}
</script>
  