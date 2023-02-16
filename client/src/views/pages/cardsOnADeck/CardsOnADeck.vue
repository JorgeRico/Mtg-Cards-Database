<template>
    <v-card flat class="pa-3 mt-2" style="overflow: hidden;">
        <v-card-text class="d-flex">
            <div cols="12" class="w-100">
                <h1>Cards sleeved on a deck</h1>
                <CardsOutOfAlbum :isOnACart="false" :isOnADeck="true"></CardsOutOfAlbum>
            </div>
        </v-card-text>
    </v-card>
</template>
  
<script>
import CardsOutOfAlbum from '@/layouts/components/cardsOutOfAlbum/cardsOutOfAlbum.vue'
import { getAuth } from "firebase/auth";

const auth = getAuth();

export default {
    components: {
        CardsOutOfAlbum,
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
  