<template>
    <v-card flat class="pa-3 mt-2" style="overflow: hidden;">
        <v-card-text class="d-flex">
            <div cols="12" class="w-100">
                <h1>Cards Waiting to arrive</h1>
                <PendingCardsList></PendingCardsList>
            </div>
        </v-card-text>
    </v-card>
</template>
  
<script>
import PendingCardsList from '@/layouts/components/pendingCardsList/PendingCardsList.vue'
import { getAuth } from "firebase/auth";

const auth = getAuth();

export default {
    components: {
        PendingCardsList,
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
    }
}
</script>
  