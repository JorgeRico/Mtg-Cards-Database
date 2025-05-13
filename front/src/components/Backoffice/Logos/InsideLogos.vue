<script setup lang="ts">
    import BackofficeLayout from '@layouts/BackofficeLayout.vue';
    import Logos from "@components/Backoffice/Logos/Inside/Logo.vue";
    import Keyrune from "@components/Backoffice/Logos/Keyrune.vue";
    import { ref } from 'vue';
    import { useToast } from 'vue-toastification';
    import { TextField } from '@asigloo/vue-dynamic-forms';

    const toast = useToast();

    const form = ref({
        id: 'insideLogo-form',
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
        },
    });

    interface Logo {
        icon : string,
        name : string
    }
    const itemLogo = ref<Logo>({icon: '', name: ''})


    function handleSubmit (e: Event) : void {
        e.preventDefault();

        var nameText = document.querySelector<HTMLInputElement>('input[name="name"]')?.value;
        var iconText = document.querySelector<HTMLInputElement>('input[name="icon"]')?.value;
            
        if (checkErrors(nameText ? nameText: '', iconText ? iconText : '') == false) {
            const item = {
                icon  : iconText ? iconText : '',
                name  : nameText ? nameText : ''
            }

            itemLogo.value = { ...item };
        }
    }

    function checkErrors(name: string, icon: string) : boolean {
        if (name == '' || icon == '') {
            toast.error('Fill all data')

            return true;
        }

        return false
    }

    function handleReset() : void {
        // reset logo box
        const item = {
            icon  : '',
            name  : ''
        }
        itemLogo.value = { ...item };
        
        // reset form
        const formReset = {
            id: 'insideLogo-form',
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
                })
            }
        }
        form.value = { ...formReset }

        toast.success('Form fields are empty')
    }
</script>

<template>
    <BackofficeLayout>
        <h1>Inside album logos</h1>
        <div class="mt20 left w50">
            <dynamic-form :form=form @submit.prevent="handleSubmit">
                <input :label="form.fields.name.label" class="form-control mb20">
                <input :label="form.fields.icon.label" class="form-control mb20">
            </dynamic-form>
            <Keyrune></Keyrune>
            <button class="btn btn-primary mt40" @click="handleSubmit">Submit</button>
            <button class="btn btn-reset right mt40" @click="handleReset">Reset values</button>
        </div>
        <Logos :key=itemLogo.name :item="itemLogo"></Logos>
    </BackofficeLayout>
</template>

<style lang="css" scoped>
    
</style>