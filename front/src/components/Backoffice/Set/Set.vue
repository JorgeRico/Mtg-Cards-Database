<script setup lang="ts">
    import BackofficeLayout from '@layouts/BackofficeLayout.vue';
    import Table from '@components/Backoffice/Set/Table/Table.vue';
    import Filters from '@components/Backoffice/Set/List/Filters.vue';
    import Info from '@components/Backoffice/Set/List/Info.vue';
    import Title from '@components/Backoffice/Set/List/Title.vue';
    import Pagination from '@components/Backoffice/Pagination/Pagination.vue';
    import { ref } from 'vue';

    const setInfo    = ref<Object>();
    const setItems   = ref<Object[]>();
    const page       = ref<Number>(1);
    const limit      = ref<any>(100);
    const totalPages = ref<Number>(0);
    const filters    = ref<Number>(0);
    const hasFilters = ref<Boolean>(false);

    // get set list
    function getSets() {
        let url = import.meta.env.VITE_API_SERVER + import.meta.env.VITE_API_SETS;
        url += '?page=' + page.value;
        url += '&filter=' + filters.value;

        fetch(url).then(async response => {
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
    }

    // get section info
    function getSetInfo() {
        let url = import.meta.env.VITE_API_SERVER + import.meta.env.VITE_API_NUMSETS;
        url += '?filter=' + filters.value;

        fetch(url)
        .then(async response => {
            const dataSets   = await response.json();
            setInfo.value    = await dataSets.data[0];
            totalPages.value = Math.ceil(await dataSets.data[0].numTotal / limit.value );

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
    }

    // click on pagination option
    function handleCustomChange(index : Number) {
        page.value     = index;
        setItems.value = [];

        getSets();
    }

    // select filter
    function handleCustomFilterChange(num : Number) {
        filters.value  = num;
        page.value     = 1;
        setItems.value = [];
        setInfo.value  = {};

        if (num != 0) {
            hasFilters.value = true;
        } else {
            hasFilters.value = false;
        }

        getSets();
        getSetInfo();
    }

    // init
    const initialize = () => {
        getSets();
        getSetInfo();
    };

    initialize();
</script>

<template>
    <BackofficeLayout>
        <Title
            :key=filters
            :option=filters>
        </Title>
        <Info 
            :key=setInfo 
            :data=setInfo
            :hasFilters=hasFilters>
        </Info>
        <Filters 
            @custom-filter-change="handleCustomFilterChange">
        </Filters>
        <Pagination     
            :key=totalPages 
            @custom-page-change="handleCustomChange"
            :page=page 
            :total=totalPages>
        </Pagination>
        <Table 
            :key=setItems 
            :items=setItems>
        </Table>
        <Pagination     
            :key=totalPages 
            @custom-page-change="handleCustomChange"
            :page=page
            :total=totalPages>
        </Pagination>
    </BackofficeLayout>
</template>

<style lang="css" scoped>

</style>