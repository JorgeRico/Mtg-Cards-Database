<script setup lang="ts">
    import BackofficeLayout from '@layouts/BackofficeLayout.vue';
    import { useRoute } from 'vue-router'
    import { ref } from 'vue'

    const route = useRoute()
    const id    = ref(route.params.id)
</script>

<template>
    <BackofficeLayout>
        <h1>card set template</h1>
        <p>Looking for Product: {{ id }}</p>
    </BackofficeLayout>
</template>

<style lang="css" scoped>

</style>