<template>
    <v-card flat class="pa-3 mt-2" style="overflow: hidden;">
        <v-card-text class="d-flex">
            <div cols="12" class="w-100">
                <h1>Cards need better grade or correct language</h1>
                <CardsBetterGraded :isOnACart="false" :isOnADeck="true"></CardsBetterGraded>
            </div>
        </v-card-text>
    </v-card>
</template>
  
<script>
import CardsBetterGraded from '@/layouts/components/cardsBetterGraded/CardsBetterGraded.vue'

export default {
    components: {
        CardsBetterGraded,
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
  