<template>
    <v-card flat class="pa-3 mt-2">
        <v-card-text class="d-flex">
            <div>
                <h1>Proceso de anonimización</h1>
                <p class="f16 mt-5">Proceso para la anonimización de datos sensibles de los pacientes de los informaes
                    a analizar.</p>
                <p class="f16">Puedes procesar y anonimizar varios informes clínicos a la vez.</p>
                <p class="f16">Una vez el proceso de anonimización haya finalizado, podrás descargarlos.</p>
                <p class="f16">Extensión de ficheros permitida -> <strong>TXT</strong></p>
                <p class="f16">Número máximo de ficheros permitido -> <strong>50</strong></p>
                <v-btn color="primary" class="f16 me-3 mt-5" @click="getFiles" @change="onFilesChange">
                    <v-file-input id="filesUpload" multiple="multiple" file="file" ref="file" accept=".txt,.TXT"
                        hide-input prepend-icon="" :key="fileInputKey" />
                    <v-icon class="d-sm-none">
                        {{ icons.mdiCloudUploadOutline }}
                    </v-icon>
                    <span class="d-none d-sm-block">Subir ficheros</span>
                </v-btn>
                <input ref="refInputEl" type="file" accept=".txt,.TXT" :hidden="true" />
            </div>
        </v-card-text>

        <Spinner></Spinner>

        <AnonimizeDataLayer :filesList="filesList"></AnonimizeDataLayer>

        <ExtensionFileWithNameError :extensionFileError="extensionFileError"></ExtensionFileWithNameError>
        <EmptyFileWithNameError :emptyFileError="emptyFileError"></EmptyFileWithNameError>
        <MaxFileError></MaxFileError>
        <ApiError></ApiError>

    </v-card>
</template>

<script>
import { mdiCloudUploadOutline } from '@mdi/js'
import AnonimizeDataLayer from '@/layouts/components/case6/AnonimizeDataLayer.vue'
import Spinner from '@/layouts/components/Spinner.vue'
import MaxFileError from '@/layouts/components/case6/errors/MaxFileError.vue'
import ApiError from '@/layouts/components/case6/errors/ApiError.vue'
import EmptyFileWithNameError from '@/layouts/components/case6/errors/EmptyFileWithNameError.vue'
import ExtensionFileWithNameError from '@/layouts/components/case6/errors/ExtensionFileWithNameError.vue'
import axios from "axios";
import { getAuth } from "firebase/auth";
const auth = getAuth();

const url = process.env.VUE_APP_SERVER + process.env.VUE_APP_ANONIMIZE_ENDPOINT;

export default {
    components: {
        AnonimizeDataLayer,
        Spinner,
        ApiError,
        EmptyFileWithNameError,
        ExtensionFileWithNameError,
        MaxFileError
    },
    data() {
        return {
            originalFile: '',
            responseFile: '',
            filesList: [],
            extensionFileError: '',
            emptyFileError: '',
            maxFiles: 50,
            fileInputKey: 0
        }
    },
    setup() {
        return {
            icons: {
                mdiCloudUploadOutline,
            },
        }
    },
    methods: {
        clear() {
            this.fileInputKey++;
        },
        getFiles() {
            this.uploadElementFile('filesUpload')
        },
        onFilesChange(event) {
            var files = event.target.files;

            this.reset();
            this.showSpinner();

            setTimeout(() => this.sendFiles(files), 2500);
        },
        sendFiles(files) {
            var error = this.checkFileErrors(files);

            if (!error) {
                this.apiCall(files);
            }
        },
        async apiCall(files) {
            let formData = new FormData();
            var fileNamesList = [];
            for (var i = 0; i < files.length; i++) {
                let file = files[i];
                fileNamesList[i] = file.name;
                formData.append('files', file);
            }

            await axios
                .post(url, formData, {
                    headers: {
                        'accept': 'application/json',
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(response => {
                    this.info = response.data;
                    this.filesList = this.setAnonimizedFileContentArray(this.info, fileNamesList)
                    this.hideSpinner();
                    this.show('result');
                    this.clear();
                })
                .catch(error => {
                    this.hideSpinner();
                    this.show('errorApiFile');
                    this.errored = true
                })
                .finally(() => this.loading = false)
        },
        checkFileErrors(files) {
            var error = false;

            for (let i = 0; i < files.length; i++) {
                if (this.checkExtensionFile(files[i]) === false) {
                    error = true;
                    break;
                }
                if (this.checkEmptyFile(files[i]) === false) {
                    error = true
                    break;
                }
                if (this.checkMaxFiles(i) === false) {
                    error = true
                    break;
                }
            }

            return error;
        },
        setAnonimizedFileContentArray(response, filesList) {
            var allInfo = [];

            for (let i = 0; i < response.length; i++) {
                var item = {
                    'id': 'anonimized-id-' + i,
                    'name': filesList[i],
                    'original': response[i].Original,
                    'anonimized': response[i].Anonimized
                }
                allInfo.push(item);
            }

            return allInfo;
        },
        uploadElementFile(id) {
            var fileUpload = document.getElementById(id);

            if (fileUpload != null) {
                fileUpload.click();
            }
        },
        checkExtensionFile(file) {
            if (!file.name.includes(".txt") && !file.name.includes(".TXT")) {
                this.extensionFileError = file.name;
                this.hideSpinner();
                this.show('extentionFileError');
                return false;
            }

            return true;
        },
        checkEmptyFile(file) {
            if (!file || file.size == 0) {
                this.emptyFileError = file.name;
                this.hideSpinner();
                this.show('emptyFileError');
                return false;
            }

            return true;
        },
        checkMaxFiles(num) {
            if (num + 1 == this.maxFiles) {
                this.hideSpinner();
                this.show('maxFilesError');
                return false;
            }
            return true;
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
            this.hide('maxFilesError');
            this.hide('extentionFileError');
            this.hide('emptyFileError');
            this.hide('errorApiFile');
            this.hide('result');
        },
        hideSpinner() {
            this.hide('spinner');
        },
        showSpinner() {
            this.show('spinner');
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
  