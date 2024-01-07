<template>
    <v-card class="no-shadow">
        <div class="mt20 left w-50" style="padding: 0 20px;">
            <v-form>
                <Input :label="nameLabel" :modelName="nameModel" :placeholderText="namePlaceholder"></Input>
                <Input :label="iconLabel" :modelName="iconModel" :placeholderText="iconPlaceholder"></Input>
                <div class="mt40">
                    <Error :errorMessage="errorMessage" class="mb20"></Error>
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
import Logo from '@/layouts/components/logos/inside/Logo.vue';
import Error from '@/layouts/components/errors/Error.vue';

export default {
    components: {
        Dropdown,
        Input,
        Logo,
        Error
    },
    data () {
        return {
            errorMessage    : '',
            setList         : null,

            nameLabel       : 'Logo name',
            nameModel       : 'nameText',
            namePlaceholder : 'logo Text Name',

            iconLabel       : 'Icon',
            iconModel       : 'logoIcon',
            iconPlaceholder : 'Logo icon text',
        }
    },
    methods: {
        addSetToPreview () {
            var nameText  = document.getElementById('nameText').value;
            var logoIcon  = document.getElementById('logoIcon').value;
            
            if (this.checkErrors(nameText, logoIcon) == false) {
                let setItem = {
                    name  : nameText,
                    icon  : logoIcon
                }

                this.getItemSetList(setItem);
                this.clearValues();
            }
        },
        clearValues() {
            document.getElementById('nameText').value = '';
            document.getElementById('logoIcon').value = '';
        },
        checkErrors(nameText, logoIcon) {
            if (nameText == '' || logoIcon == '') {
                this.errorMessage = 'Fill all data';
                this.show('error');
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
        }
    },
    mounted() {
        
    },
    beforeMount() {

    }
}
</script>
  