<script setup lang="ts">
    import BackofficeLayout from '@layouts/BackofficeLayout.vue';
    import Keyrune from "@components/Backoffice/Logos/Keyrune.vue";

    import { ref } from 'vue';

    // logoLabel       : 'Logo',
    //         logoModel       : '',
    //         logoPlaceholder : 'logo Text',

    //         iconLabel       : 'Icon',
    //         iconModel       : 'logoIcon',
    //         iconPlaceholder : 'Logo icon text',

    //         yearLabel       : 'Year',
    //         yearModel       : 'logoYear',
    //         yearPlaceholder : 'Logo Year',

    //         monthLabel      : 'Month',
    //         monthModel      : 'logoMonth',
    // interface Months<T> {
    //     value: T
    // }
    interface Logos {
        icon  : string,
        logo  : string
        month : string,
        year  : string
    }

    const setList = ref<Logos[]>([]);
    const months = ref<String[]>(['January','February','March','April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);

    // const monthsArray = ref<Months[]>([])
    // months.value = 
</script>

<template>
    <BackofficeLayout>
        <h1>Outside album logos</h1>

        <div class="mt20 left w50">
            <form ref="anyName">
                <div class="left w100 mb20">
                    <input name="logo" type="text" class="form-control" placeholder="Logo" />
                </div>
                <div class="left w100 mb20">
                    <input name="logoIcon" type="text" class="form-control" placeholder="Logo icon" />    
                </div>
                <div class="right dropdown w100 mb20">
                    <button class="btn btn-primary dropdown-toggle w100 text-left" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Select month
                    </button>
                    <ul class="dropdown-menu">
                        <li v-for="month in months">
                            <a class="dropdown-item">{{ month }}</a>
                        </li>
                    </ul>
                </div>
                <div class="left w100 mb20">
                    <input name="year" type="text" class="form-control" placeholder="Year" />
                </div>
            </form>
        </div>

        <Logo :setList="setList"></Logo>
        
        <Keyrune></Keyrune>
    </BackofficeLayout>
</template>

<style lang="css" scoped>

</style>