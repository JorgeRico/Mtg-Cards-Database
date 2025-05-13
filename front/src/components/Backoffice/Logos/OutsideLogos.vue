<script setup lang="ts">
    import BackofficeLayout from '@layouts/BackofficeLayout.vue';
    import Keyrune from "@components/Backoffice/Logos/Keyrune.vue";
    import { ref } from 'vue';
    import Logos from "@components/Backoffice/Logos/Outside/Logo.vue";
    import { useToast } from 'vue-toastification';
    import { TextField, SelectField } from '@asigloo/vue-dynamic-forms';

    const toast = useToast();

    const form = ref({
        id: 'outsideLogo-form',
        fields: {
            name: TextField({
                label: 'Set name',
                placeholder: 'Write set name',
                value : ''
            }),
            icon: TextField({
                label: 'Set icon',
                placeholder: 'Write logo abbreviation',
                value: ''
            }),
            year: TextField({
                label: 'Set year',
                placeholder: 'Write release year',
                value: ''
            }),
            month: SelectField({
                label: 'Set release month release ',
                selected: 'Write release month',
                options: [
                    {
                        value: '',
                        label: 'Write release month'
                    },
                    {
                        value: 'January',
                        label: 'January'
                    },
                    {
                        value: 'February',
                        label: 'February'
                    },
                    {
                        value: 'March',
                        label: 'March'
                    },
                    {
                        value: 'April',
                        label: 'April'
                    },
                    {
                        value: 'May',
                        label: 'May'
                    },
                    {
                        value: 'June',
                        label: 'June'
                    },
                    {
                        value: 'July',
                        label: 'July'
                    },
                    {
                        value: 'August',
                        label: 'August'
                    },
                    {
                        value: 'September',
                        label: 'September'
                    },
                    {
                        value: 'October',
                        label: 'October'
                    },
                    {
                        value: 'November',
                        label: 'November'
                    },
                    {
                        value: 'December',
                        label: 'December'
                    }
                ],
            }),
        },
    });

    interface Logo {
        icon  : string,
        name  : string,
        year  : string,
        month : string
    }
    const itemLogo = ref<Logo>({icon: '', name: '', year :'', month: ''})
    let setList = ref<Logo[]>([]);

    function handleSubmit (e: Event) : void {
        e.preventDefault();

        var nameText  = document.querySelector<HTMLInputElement>('input[name="name"]')?.value;
        var iconText  = document.querySelector<HTMLInputElement>('input[name="icon"]')?.value;
        var yearText  = document.querySelector<HTMLInputElement>('input[name="year"]')?.value;
        var monthText = document.querySelector<HTMLInputElement>('select[name="month"]')?.value;

        if (checkErrors(nameText ? nameText: '', iconText ? iconText : '', yearText ? yearText: '', monthText ? monthText : '') == false) {
            setList.value.push({
                icon  : iconText ? iconText : '',
                name  : nameText ? nameText : '',
                month : monthText ? monthText : '',
                year  : yearText ? yearText : ''
            });
        }
    }

    function checkErrors(name: string, icon: string, year: string, monthText: string) : boolean {
        if (name == '' || icon == '' || year == '' || monthText == '') {
            toast.error('Fill all data')

            return true;
        }

        return false
    }

    function handleReset() : void {
        // reset logo box
        const item = {
            icon  : '',
            name  : '',
            year  : '',
            month : ''
        }
        itemLogo.value = { ...item };
        
        // reset form
        const formReset = {
            id: 'outsideLogo-form',
            fields : {
                name : TextField({
                    label: 'Set name',
                    placeholder: 'Write set name',
                    value: undefined
                }),
                icon: TextField({
                    label: 'Set icon',
                    placeholder: 'Write logo abbreviation',
                    value: undefined
                }),
                year: TextField({
                    label: 'Set release year',
                    placeholder: 'Write release year',
                    value: undefined
                }),
                month: SelectField({
                    label: 'Set release month release ',
                    selected: 'Write release month',
                    options: [
                        {
                            value: '',
                            label: 'Write release month'
                        },
                        {
                            value: 'January',
                            label: 'January'
                        },
                        {
                            value: 'February',
                            label: 'February'
                        },
                        {
                            value: 'March',
                            label: 'March',
                        },
                        {
                            value: 'April',
                            label: 'April',
                        },
                        {
                            value: 'May',
                            label: 'May',
                        },
                        {
                            value: 'June',
                            label: 'June',
                        },
                        {
                            value: 'July',
                            label: 'July',
                        },
                        {
                            value: 'August',
                            label: 'August',
                        },
                        {
                            value: 'September',
                            label: 'September',
                        },
                        {
                            value: 'October',
                            label: 'October',
                        },
                        {
                            value: 'November',
                            label: 'November',
                        },
                        {
                            value: 'December',
                            label: 'December'
                        }
                    ],
                }),
            }
        }
        form.value = { ...formReset }
        setList.value = [];

        toast.success('Form fields are empty')
    }

    interface Logos {
        icon  : string,
        logo  : string
        month : string,
        year  : string
    }
</script>

<template>
    <BackofficeLayout>
        <h1>Outside album logos</h1>
        <div class="mt20 left w50">
            <dynamic-form :form=form @submit.prevent="handleSubmit">
                <input :label="form.fields.name.label" class="form-control mb20">
                <input :label="form.fields.icon.label" class="form-control mb20">
                <select-option :selected="form.fields.month.selected" :label="form.fields.month.label" class="form-control mb20"></select-option>
                <input :label="form.fields.year.label" class="form-control mb20">
            </dynamic-form>
            <Keyrune></Keyrune>
            <button class="btn btn-primary mt40" @click="handleSubmit">Submit</button>
            <button class="btn btn-reset right mt40" @click="handleReset">Reset values</button>
        </div>
        <Logos :key=setList :items="setList"></Logos>
    </BackofficeLayout>
</template>

<style lang="css" scoped>    
   
</style>