<script setup lang="ts">
    import BackofficeLayout from '@layouts/BackofficeLayout.vue';
    import Table from '@components/Backoffice/Set//Table/Table.vue';
    import Filters from '@components/Backoffice/Set/List/Filters.vue';

    const items = [
        {
            complete       : 1,
            setLogo        : 'logo',
            id             : 1,
            setName        : 'name',
            setAbrv        : 'abrev',
            setReleaseDate : 'date',
            ownedCards     : 1,
            setTotalCards  : 1,
            specialCards   : 1
        },
        {
            complete       : 1,
            setLogo        : 'logo',
            id             : 1,
            setName        : 'name',
            setAbrv        : 'abrev',
            setReleaseDate : 'date',
            ownedCards     : 1,
            setTotalCards  : 1,
            specialCards   : 1
        },
        {
            complete       : 1,
            setLogo        : 'logo',
            id             : 1,
            setName        : 'name',
            setAbrv        : 'abrev',
            setReleaseDate : 'date',
            ownedCards     : 1,
            setTotalCards  : 1,
            specialCards   : 1
        }
    ]
</script>

<template>
    <BackofficeLayout>
        <h1>special set template</h1>
        <Filters></Filters>
        <Table :items=items></Table>
    </BackofficeLayout>
</template>

<style lang="css" scoped>

</style>