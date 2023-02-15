<template>
    <v-card>
        <div class="left w-50" style="padding: 0 20px;">
            <v-form>
                <Input :label="logoLabel" :modelName="logoModel" :placeholderText="logoPlaceholder"></Input>
                <Input :label="iconLabel" :modelName="iconModel" :placeholderText="iconPlaceholder"></Input>
                <Dropdown :label="monthLabel" :modelName="monthModel" :items="months"></Dropdown>
                <Input :label="yearLabel" :modelName="yearModel" :placeholderText="yearPlaceholder"></Input>
                <div class="mt-40">
                    <EmptyInputError class="mb-20"></EmptyInputError>
                    <v-btn color="primary" class="left me-3 mb-5" @click="reset">
                        <span class="d-none d-sm-block">Reset</span>
                    </v-btn>
                    <v-btn color="success" class="right me-3 mb-5" @click="addSetToPreview">
                        <span class="d-none d-sm-block">Add</span>
                    </v-btn>
                </div>
            </v-form>
        </div>
        <Logo :setList="setList"></Logo>
        <div class="w-100 left" style="padding: 30px 20px;">
            Note: logos from <a href="https://keyrune.andrewgioia.com/icons.html" target="_BLANK">https://keyrune.andrewgioia.com/icons.html</a>
        </div>
    </v-card>
</template>

<script>
import Dropdown from '@/layouts/components/form/Dropdown.vue';
import Input from '@/layouts/components/form/Input.vue';
import Logo from '@/layouts/components/logos/Logo.vue';
import EmptyInputError from '@/layouts/components/EmptyInputError.vue';
import helper from "@/mixins/helper";

export default {
    mixins: [helper],
    components: {
        Dropdown,
        Input,
        Logo,
        EmptyInputError
    },
    data () {
        return {
            setList         : null,

            logoLabel       : 'Logo',
            logoModel       : 'logoText',
            logoPlaceholder : 'logo Text',

            iconLabel       : 'Icon',
            iconModel       : 'logoIcon',
            iconPlaceholder : 'Logo icon text',

            yearLabel       : 'Year',
            yearModel       : 'logoYear',
            yearPlaceholder : 'Logo Year',

            monthLabel      : 'Month',
            monthModel      : 'logoMonth',
            months          : ['January','February','March','April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        }
    },
    methods: {
        addSetToPreview () {
            var logoText  = document.getElementById('logoText').value;
            var logoIcon  = document.getElementById('logoIcon').value;
            var logoYear  = document.getElementById('logoYear').value;
            var logoMonth = document.getElementById('logoMonth').value;

            if (this.checkErrors(logoText, logoIcon, logoYear, logoMonth) == false) {
                let setItem = {
                    logo  : logoText,
                    icon  : logoIcon,
                    year  : logoYear,
                    month : logoMonth
                }

                this.getItemSetList(setItem);
                this.clearValues();
            }
        },
        clearValues() {
            document.getElementById('logoText').value = '';
            document.getElementById('logoIcon').value = '';
            document.getElementById('logoYear').value = '';
            document.getElementById('logoMonth').value = null;
        },
        checkErrors(logoText, logoIcon, logoYear, logoMonth) {
            if (logoText == '' || logoIcon == '' || logoYear == '' || logoMonth == '') {
                this.show('errorEmptyInput');
                setTimeout(() => this.hide('errorEmptyInput'), 2500);

                return true;
            }

            return false
        },
        getItemSetList(setItem) {
            let items = []

            if (this.setList == null) {
                items.push(setItem);
            } else {
                items = this.setList;
                items.push(setItem);
            }

            this.setList = items;
        },
        reset() {
            this.setList = null
        },
    },
    mounted() {
        
    },
    beforeMount() {

    }
}
</script>
  