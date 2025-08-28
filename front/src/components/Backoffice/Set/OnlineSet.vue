<script setup lang="ts">
    import BackofficeLayout from '@layouts/BackofficeLayout.vue';
    import Table from '@components/Backoffice/Set/Table/Table.vue';
    import Info from '@components/Backoffice/Set/Info/SpecialSet.vue';
    import Pagination from '@components/Backoffice/Pagination/Pagination.vue';
    import { ref } from 'vue';
    import { useToast } from 'vue-toastification';

    const toast = useToast();

    interface SetData {
        complete       : number,
        setTotalCards  : number,
        ownedCards     : number,
        setLogo        : string
        setReleaseDate : string,
        setAbrv        : string,
        id             : number,
        setName        : string,
        specialCards   : number
    }

    interface Info {
        numTotal         : number,
        numTotalComplete : number
    }

    const setInfo    = ref<Info>({ 'numTotal': 0, 'numTotalComplete': 0 });
    const setItems   = ref<SetData[]>([]);
    const page       = ref<Number>(1);
    const limit      = ref<any>(100);
    const totalPages = ref<Number>(0);

    // get set list
    function getSets() {
        let url = import.meta.env.VITE_API_SERVER + import.meta.env.VITE_API_ONLINESETS_ENDPOINT;
        url += '?page=' + page.value;

        fetch(url).then(async response => {
            try {
                const data     = await response.json();
                setItems.value = await data.data;
            } catch (error) {
                toast.error('DB error: No data found')
                return;
            }
        })
        .catch(error => {
            toast.error("There was an error!", error);
        });
    }

    // get section info
    function getSetInfo() {
        let url = import.meta.env.VITE_API_SERVER + import.meta.env.VITE_API_ONLINESETS_NUM_ENDPOINT;

        fetch(url).then(async response => {
            try {
                const dataSets   = await response.json();
                setInfo.value    = await dataSets.data[0];
                totalPages.value = Math.ceil(await dataSets.data[0].numTotal / limit.value );
            } catch (error) {
                toast.error('DB error: No data found')
                return;
            }
        })
        .catch(error => {
            toast.error("There was an error!", error);
        });
    }

    // click on pagination option
    function handleCustomChange(index : number) {
        page.value     = index;
        setItems.value = [];

        getSets();
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
        <h1>
            <strong>Mtg Special sets</strong>
        </h1>
        <Info 
            :key=setInfo
            :data=setInfo>
        </Info>
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