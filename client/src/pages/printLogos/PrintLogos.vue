<template>
    <v-card flat class="pa-3 mt-2" style="overflow: hidden;">
        <v-card-text class="d-flex">
            <div cols="12" class="w-100">
                <h1>Logos</h1>
            </div>
        </v-card-text>
        <PrintLogos class="mt-20"></PrintLogos>
    </v-card>
</template>


<script>
import PrintLogos from '@/layouts/components/logos/PrintLogos.vue'

export default {
    components: {
        PrintLogos,
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
  