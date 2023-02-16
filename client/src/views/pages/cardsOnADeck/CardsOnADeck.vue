<template>
    <v-card flat class="pa-3 mt-2" style="overflow: hidden;">
        <v-card-text class="d-flex">
            <div cols="12" class="w-100">
                <h1>Cards sleeved on a deck</h1>
                <CardsOnADeck></CardsOnADeck>
            </div>
        </v-card-text>
    </v-card>
</template>
  
<script>
import CardsOnADeck from '@/layouts/components/cardsOnADeck/CardsOnADeck.vue'
import { getAuth } from "firebase/auth";

const auth = getAuth();

export default {
    components: {
        CardsOnADeck,
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
  