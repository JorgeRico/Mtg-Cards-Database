<template>
    <v-card flat class="pa-3 mt-2">
        <v-card-text class="d-flex">
            <div>
                <h1>Tagger</h1>
                <p class="f16 mt-30">Proceso de etiquetado de textos.</p>
                <p class="f16">Se analizará el informe clínico que introduzcas y se procederá a identificar y etiquetar
                    las palabras
                    o conjuntos de palabras de las diferentes terminologías médicas seleccionadas.</p>
                <div class="f16 mt-10 pb-20">
                    <label>¿ Con que modelo quieres trabajar ?</label>
                    <div class="mt-7" cols="6">
                        <input type="radio" name="option" class="radioButton mr-5" value="A"
                            @change="selectRadio"><strong>Modelo
                            A</strong> (versión
                        simplificada)
                    </div>
                    <div class="mt-5" cols="6">
                        <input type="radio" name="option" class="radioButton mr-5" value="B"
                            @change="selectRadio"><strong>Modelo
                            B</strong> (versión
                        avanzada)
                    </div>
                </div>

                <div class="f16 mt-10 invisible" id="selectTerms">
                    <label><strong>Selecciona Terminologías</strong> (mínimo 5)</label>
                    <v-select :multiple="this.multiple" :items="inventoryItems" @change="selectedOption($event)">
                    </v-select>
                </div>

                <div id="fileContent" class="f16 invisible pb-20">
                    <p class="mt-5">Selecciona un informe clínico para anonimizar.</p>
                    <p>Visualmente podrás ver el resultado del procesado de los datos, comparando el original con la
                        salida
                        anonimizada.</p>
                    <p>Extensión de ficheros permitida -> <strong>TXT</strong>.</p>
                    <p>Tamaño máximo permitido -> <strong>800K</strong>.</p>
                    <v-btn color="primary" class="me-3 mt-5" @click="getFiles" @change="onFilesChange">
                        <v-file-input id="fileUpload" file="file" ref="file" accept=".txt,.TXT" hide-input
                            prepend-icon="" :key="fileInputKey" />
                        <v-icon class="d-sm-none">
                            {{ icons.mdiCloudUploadOutline }}
                        </v-icon>
                        <span class="d-none d-sm-block">Subir ficheros</span>
                    </v-btn>
                    <input ref="refInputEl" type="file" accept=".txt,.TXT" :hidden="true" />
                </div>
            </div>
        </v-card-text>

        <FiveElementsError></FiveElementsError>
        <ExtensionFileWithNameError></ExtensionFileWithNameError>
        <EmptyFileWithNameError></EmptyFileWithNameError>
        <ApiError></ApiError>

        <Spinner></Spinner>

        <TaggerDataLayer :filesList="filesList"></TaggerDataLayer>
    </v-card>
</template>

<script>
import { mdiCloudUploadOutline } from '@mdi/js'
import Spinner from '@/layouts/components/Spinner.vue'
import TaggerDataLayer from '@/layouts/components/case6/TaggerDataLayer.vue'
import ExtensionFileWithNameError from '@/layouts/components/case6/errors/ExtensionFileWithNameError.vue'
import EmptyFileWithNameError from '@/layouts/components/case6/errors/EmptyFileWithNameError.vue'
import ApiError from '@/layouts/components/case6/errors/ApiError.vue'
import FiveElementsError from '@/layouts/components/case6/errors/FiveElementsError.vue'
import axios from "axios";
import { getAuth } from "firebase/auth";
const auth = getAuth();

const minTerminologies = 5;
const urlTagger = process.env.VUE_APP_SERVER + process.env.VUE_APP_TAGGER_ENDPOINT;
const urlTerminologies = process.env.VUE_APP_SERVER + process.env.VUE_APP_TERMINOLOGIES_ENDPOINT;

export default {
    components: {
        Spinner,
        ExtensionFileWithNameError,
        EmptyFileWithNameError,
        ApiError,
        TaggerDataLayer,
        FiveElementsError
    },
    data() {
        return {
            inputFileName: '',
            filesList: [],
            terminologyList: [],
            option: '',
            multiple: true,
            fileInputKey: 0
        }
    },
    setup() {
        return {
            radioButton: '',
            icons: {
                mdiCloudUploadOutline,
            },
        }
    },
    methods: {
        clear() {
            this.fileInputKey++;
        },
        selectRadio(event) {
            this.showSpinner();
            setTimeout(() => this.hideSpinner(), 2500);
            this.radioButton = event.target.value;
            this.getTerminologies();
            setTimeout(() => this.show('selectTerms'), 2500);
        },
        selectedOption(event) {
            this.option = event;
            this.reset();
            this.hide('fileContent')

            if (this.option.length >= minTerminologies) {
                this.showSpinner();
                setTimeout(() => this.hideSpinner(), 2500);
                setTimeout(() => this.show('fileContent'), 2500);
            } else {
                this.show('errorFiveElements');
            }
        },
        async getTerminologies() {
            await axios
                .get(urlTerminologies)
                .then(response => {
                    this.terminologyList = response.data;
                })
                .catch(error => {
                    this.hideSpinner();
                    this.show('errorApiFile');
                })
                .finally(() => this.loading = false)
        },
        getFiles() {
            this.uploadElementFile('fileUpload')
        },
        async onFilesChange(event) {
            var files = event.target.files;

            this.reset();
            this.showSpinner();
            setTimeout(() => this.apiCall(files), 2500);
        },
        async apiCall(files) {
            let formData = new FormData();

            // add files
            for (var i = 0; i < files.length; i++) {
                let file = files[i];
                formData.append('files', file);
            }

            // add more params
            formData.append("model_version", this.radioButton);

            var res = '';
            for (var i = 0; i < this.option.length; i++) {
                if (i == 0) {
                    res = this.option[i];
                } else {
                    res += ',' + this.option[i];
                }
            }

            // send in extrange array string format to the api (api requisite)
            var temp = [];
            temp.push(res);
            formData.append("terminos", temp);

            await axios
                .post(urlTagger, formData, {
                    headers: {
                        'accept': 'application/json',
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(response => {
                    this.info = response.data;

                    for (var i = 0; i < this.info.output.length; i++) {
                        for (var j = 0; j < this.info.output[i].Etiquetas.length; j++) {
                            var text = this.info.output[i].Etiquetas[j].expression + '<sup>(' + (j + 1) + ')</sup> ';
                            this.info.output[i].HTML = this.info.output[i].HTML.replaceAll(this.info.output[i].Etiquetas[j].expression, text);
                        }
                    }

                    this.filesList = this.info.output
                    this.hideSpinner();
                    this.show('result');
                    this.clear();
                })
                .catch(error => {
                    this.hideSpinner();
                    this.show('errorApiFile');
                })
                .finally(() => this.loading = false)
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
        reset() {
            this.hideSpinner();
            this.hide('errorFiveElements');
            this.hide('extentionFileError');
            this.hide('emptyFileError');
            this.hide('errorApiFile');
            this.hide('result');
        },
        uploadElementFile(id) {
            var fileUpload = document.getElementById(id)
            if (fileUpload != null) {
                fileUpload.click();
            }
        },
        checkExtensionFile(file) {
            if (!file.name.includes(".txt") && !file.name.includes(".TXT")) {
                this.hideSpinner();
                this.show('extentionFileError');
                return false;
            }
            return true;
        },
        checkEmptyFile(file) {
            if (!file || file.size == 0) {
                this.hideSpinner();
                this.show('emptyFileError');
                return false;
            }
            return true;
        },
        hideSpinner() {
            this.hide('spinner');
        },
        showSpinner() {
            this.show('spinner');
        }
    },
    computed: {
        inventoryItems() {
            return this.terminologyList?.map(item => ({
                text: item.Vocabulary,
                value: item.Abbreviation
            }))
        }
    },
    beforeMount() {
        auth.onAuthStateChanged(function (user) {
            if (!user) { // not logged in
                window.location.href = "/";
            }
        })
    }
}
</script>