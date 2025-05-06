<script setup lang="ts">
    import BackofficeLayout from '@layouts/BackofficeLayout.vue';

</script>

<template>
    <BackofficeLayout>
        <h1>card set template</h1>
        <p>Looking for Product: {{ $route.params.id }}</p>

    </BackofficeLayout>
</template>

<style lang="css" scoped>

</style>