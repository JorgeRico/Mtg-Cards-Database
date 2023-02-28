<template>
    <VCardItem class="justify-center">
        <template #prepend>
            <div class="d-flex">
            <div v-html="logo" />
            </div>
        </template>

        <VCardTitle class="font-weight-semibold text-2xl text-uppercase">
            Vue 3 TestCase
        </VCardTitle>
    </VCardItem>

    <VCardText class="pt-2">
        <h5 class="text-h5 font-weight-semibold mb-1">
            Welcome! 👋🏻
        </h5>
        <p class="mb0">
            Please sign-in to your account and start the adventure
        </p>
    </VCardText>
</template>

<script>
import logo from '@/assets/logo.svg?raw';
import router from "@/router";

export default {
    components: {

    },
    data() {
        return {
            logo : logo,
        }
    },
    methods: {
    
    },
    setup() {
        return {

        }
    },
}
</script>