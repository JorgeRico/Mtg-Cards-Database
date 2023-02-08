<template>
    <v-card flat class="pa-3 mt-2" style="overflow: hidden;">
        <v-card-text class="d-flex">
            <div cols="12" class="w-100">
                <h1>Logos</h1>
            </div>
        </v-card-text>
        <PrintLogos></PrintLogos>
    </v-card>
</template>


<script>
import PrintLogos from '@/layouts/components/logos/PrintLogos.vue'
import { getAuth } from "firebase/auth";

const auth = getAuth();

export default {
    components: {
        PrintLogos,
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
  