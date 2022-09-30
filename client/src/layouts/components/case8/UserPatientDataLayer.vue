<template>
    <div id="usersResult" class="invisible w-100">
        <h2 class="mt-10 mb-5">Usuarios afectados</h2>
        <div class="left w-49">
            <v-simple-table class="border-grey mb-10">
                <template>
                    <thead>
                        <tr>
                            <th class="text-uppercase w-50px">
                                <p class="mb-0 center" cols="6">
                                    Usuario
                                </p>
                            </th>
                            <th class="text-uppercase w-50px">
                                <p class="mb-0 center" cols="6">
                                    Asma
                                </p>
                            </th>
                            <th class="text-uppercase w-50px">
                                <p class="mb-0 center" cols="6">
                                    Epoc
                                </p>
                            </th>
                            <th class="text-uppercase w-50px">
                                <p class="mb-0 center" cols="6">
                                    Bronquitis
                                </p>
                            </th>
                            <th class="text-uppercase w-50px">
                                <p class="mb-0 center" cols="6">
                                    Rinitis
                                </p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, i) in users" :key="i">
                            <td class="text-uppercase w-40">
                                <p class="mb-0 center" cols="6">
                                    {{ item.id_user}}
                                </p>
                            </td>
                            <td class="text-uppercase w-40">
                                <p class="mb-0 center" cols="6">
                                    <span v-if="item.asma==trueValue">sí</span>
                                    <span v-else>-</span>
                                </p>
                            </td>
                            <td class="text-uppercase w-40">
                                <p class="mb-0 center" cols="6">
                                    <span v-if="item.epoc==trueValue">sí</span>
                                    <span v-else>-</span>
                                </p>
                            </td>
                            <td class="text-uppercase w-40">
                                <p class="mb-0 center" cols="6">
                                    <span v-if="item.bronq==trueValue">sí</span>
                                    <span v-else>-</span>
                                </p>
                            </td>
                            <td class="text-uppercase w-40">
                                <p class="mb-0 center" cols="6">
                                    <span v-if="item.rinit==trueValue">sí</span>
                                    <span v-else>-</span>
                                </p>
                            </td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </div>
        <div class="right w-49 pb-20">
            <div class="left w-49">
                <h2 class="mb-5"><strong>Filtrar usuarios por:</strong></h2>
                <v-checkbox v-model="checkboxAsma" label="Asma" class="mt-0"></v-checkbox>
                <v-checkbox v-model="checkboxEpoc" label="Epoc" class="mt-0"></v-checkbox>
                <v-checkbox v-model="checkboxBronquitis" label="Bronquitis" class="mt-0"></v-checkbox>
                <v-checkbox v-model="checkboxRinitis" label="Rinitis" class="mt-0"></v-checkbox>
            </div>
            <div class="right w-49">
                <h2 class="mb-5"><strong>Tipo de notificación:</strong></h2>
                <v-checkbox v-model="checkboxSMS" label="SMS" class="mt-0"></v-checkbox>
                <v-checkbox v-model="checkboxEmail" label="E-mail" class="mt-0"></v-checkbox>
                <v-checkbox v-model="checkboxWhatsapp" label="Whatsapp" class="mt-0"></v-checkbox>
            </div>
            <div class="left w-100 mt-5 mb-3">
                <h2><strong>Fecha seleccionada: {{ this.selectedDate }}</strong></h2>
            </div>
            <div class="left w-100 pb-20">
                <v-btn color="primary" class="me-3 mt-5" @click="generateAlarm">
                    <span class="d-none d-sm-block">Obtener usuarios afectados</span>
                </v-btn>
            </div>
            <div class="left w-100 pb-20">
                <AlarmEmptyOptionsError></AlarmEmptyOptionsError>
            </div>
        </div>
    </div>
</template>

<script>
import AlarmEmptyOptionsError from '@/layouts/components/case8/errors/active/AlarmEmptyOptionsError.vue';

export default {
    components: {
        AlarmEmptyOptionsError
    },
    data() {
        return {
            checkboxAsma: '',
            checkboxEpoc: '',
            checkboxRinitis: '',
            checkboxBronquitis: '',
            checkboxSMS: '',
            checkboxEmail: '',
            checkboxWhatsapp: '',
            trueValue: true,
        }
    },
    setup() {
        return {
        }
    },
    props: {
        users: {
            type: Array,
            default: null,
        },
        selectedDate: {
            type: String,
            default: '',
        },
    },
    methods: {
        checkSendOption(sms, email, whatsapp) {
            var selectedSendOption = null;

            if (sms != '') {
                selectedSendOption = 'sms';
            }
            if (email != '') {
                selectedSendOption = 'email';
            }
            if (whatsapp != '') {
                selectedSendOption = 'whatsapp';
            }

            return selectedSendOption;
        },
        checkSelectedOption(asma, epoc, rinitis, bronquitis) {
            var selectedOption = null;

            if (asma != '') {
                selectedOption = 'asma';
            }
            if (epoc != '') {
                selectedOption = 'epoc';
            }
            if (rinitis != '') {
                selectedOption = 'rinitis';
            }
            if (bronquitis != '') {
                selectedOption = 'bronquitis';
            }

            return selectedOption;
        },
        generateAlarm() {
            this.hide('alarmEmptyOptionsError');

            var selectedOption = this.checkSelectedOption(this.checkboxAsma, this.checkboxEpoc, this.checkboxRinitis, this.checkboxBronquitis);
            var selectedSendOption = this.checkSendOption(this.checkboxSMS, this.checkboxEmail, this.checkboxWhatsapp);

            if (selectedOption == null) {
                setTimeout(() => this.show('alarmEmptyOptionsError'), 500);
                return;
            } if (selectedSendOption == null) {
                setTimeout(() => this.show('alarmEmptyOptionsError'), 500);
                return;
            }

            var text = '';
            for (var i = 0; i < this.users.length; i++) {
                var add = false;
                if (this.checkboxAsma && this.users[i].asma == true) {
                    add = true;
                }
                if (this.checkboxEpoc && this.users[i].epoc == true) {
                    add = true;
                }
                if (this.checkboxRinitis && this.users[i].rinit == true) {
                    add = true;
                }
                if (this.checkboxBronquitis && this.users[i].bronq == true) {
                    add = true;
                }
                if (this.checkboxAsma == '' && this.checkboxEpoc == '' && this.checkboxRinitis == '' && this.checkboxBronquitis == '') {
                    add = true;
                }

                if (add) {
                    text += this.users[i].id_user + '\r\n';
                }
            }
            this.downloadFile(text, selectedOption, selectedSendOption);
        },
        downloadFile(text, selectedOption, selectedSendOption) {
            var filename = this.getDownloadFileName(this.selectedDate, selectedOption, selectedSendOption);
            var element = document.createElement('a');

            element.setAttribute('href', 'data:application/text;charset=utf-8,' + encodeURIComponent(text));
            element.setAttribute('download', filename);

            element.style.display = 'none';

            document.body.appendChild(element);

            element.click();
            document.body.removeChild(element);
        },
        getDownloadFileName(date, selectedOption, selectedSendOption) {
            var filename = 'usuarios_alarma_';

            if (selectedOption != null) {
                filename += selectedOption + '_';
            }

            if (selectedSendOption != null) {
                filename += selectedSendOption + '_'
            }

            filename += date + '.txt';

            return filename;
        },
        show(id) {
            var element = document.getElementById(id);
            element.classList.remove("invisible");
            element.classList.add("visible");
        },
        hide(id) {
            var element = document.getElementById(id);
            element.classList.remove("visible");
            element.classList.add("invisible");
        },
    },
}
</script>