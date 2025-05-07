<script setup lang="ts">
    import BackofficeLayout from '@layouts/BackofficeLayout.vue';
    import Table from '@components/Backoffice/Set/Table/Table.vue';
    import Filters from '@components/Backoffice/Set/List/Filters.vue';
    import Info from '@components/Backoffice/Set/List/Info.vue';
    import Pagination from '@components/Backoffice/Pagination/Pagination.vue';

    import { ref } from 'vue';

    const setInfo    = ref<Object>();
    const setItems   = ref<Object[]>();
    const page       = ref<Number | null>(null);
    var limit        = 100;
    const totalPages = ref<Number | null>(0);

    fetch(import.meta.env.VITE_API_SERVER + import.meta.env.VITE_API_SETS)
        .then(async response => {
            const data     = await response.json();
            setItems.value = await data.data;
            page.value     = await data.meta.page;

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response statusText
                const error = response.statusText;
                return Promise.reject(error);
            }
        })
        .catch(error => {
            // this.errorMessage = error;
            console.error("There was an error!", error);
        });

    fetch(import.meta.env.VITE_API_SERVER + import.meta.env.VITE_API_NUMSETS)
        .then(async response => {
            const dataSets = await response.json();
            setInfo.value  = await dataSets.data[0];

            totalPages.value = Math.trunc(await dataSets.data[0].numTotal / limit );

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response statusText
                const error = response.statusText;
                return Promise.reject(error);
            }
        })
        .catch(error => {
            // this.errorMessage = error;
            console.error("There was an error!", error);
        });
</script>

<template>
    <BackofficeLayout>
        <h1>Mtg Sets</h1>
        <Info v-if=setInfo :data=setInfo></Info>
        <Filters></Filters>
        <Pagination v-if=totalPages :page=page :total=totalPages></Pagination>
        <Table v-if=setItems :items=setItems></Table>
        <Pagination v-if=totalPages :page=page :total=totalPages></Pagination>
    </BackofficeLayout>
</template>

<style lang="css" scoped>

</style>