<template>
    <v-card flat class="pa-3 mt-2" style="overflow: hidden;">
        <v-card-text class="d-flex">
            <div cols="12" class="w-100">
                <h1>Cards Waiting to arrive</h1>
                <CardsOutOfAlbum :isOnACart="true" :isOnADeck="false"></CardsOutOfAlbum>
            </div>
        </v-card-text>
    </v-card>
</template>
  
<script>
import CardsOutOfAlbum from '@/layouts/components/cardsOutOfAlbum/CardsOutOfAlbum.vue'

export default {
    components: {
        CardsOutOfAlbum,
    },
    methods: {
    
    },
    mounted() {
    
    },
    beforeMount() {
        this.redirectIfIsNotLogged();
    }
}
</script>
  