<template>
    <v-card flat class="pa-3 mt-2">
        <v-card-text class="d-flex">
            <div>
                <h1>Análisis de imagenes</h1>

                <div class="f16 mt-5">
                    <label>¿ Cómo quieres procesar la imagen ?</label>
                    <div class="mt-5" cols="6">
                        <input type="radio" name="option" class="radioButton mr-5" value="A"
                            @change="selectRadio">Análisis
                    </div>
                    <div class="mt-5" cols="6">
                        <input type="radio" name="option" class="radioButton mr-5" value="B"
                            @change="selectRadio">Segmentación
                    </div>
                </div>

                <div id="fileContent" class="invisible">
                    <p class="f16 mt-5">Selecciona una imagen a procesar.</p>
                    <p class="f16">Extensión de ficheros permitida -> <strong>.nii.gz</strong>.</p>
                    <p class="f16">Tiempo estimado de procesado: 10-40 segundos</p>
                    <v-btn color="primary" class="me-3 mt-5" @click="getFiles" @change="onFilesChange">
                        <v-file-input id="fileUpload" file="file" ref="file" accept=".nii.gz" hide-input prepend-icon=""
                            :key="fileInputKey" />
                        <v-icon class="d-sm-none">
                            {{ icons.mdiCloudUploadOutline }}
                        </v-icon>
                        <span class="d-none d-sm-block">Subir fichero</span>
                    </v-btn>
                    <input ref="refInputEl" type="file" accept=".nii.gz" :hidden="true" />
                </div>
            </div>
        </v-card-text>

        <Success></Success>
        <SuccessAnalyze></SuccessAnalyze>
        <ExtensionFileWithNameError></ExtensionFileWithNameError>
        <EmptyFileWithNameError></EmptyFileWithNameError>
        <ApiError></ApiError>
        <Spinner></Spinner>
        <DataLayer :result="this.resultLayer"></DataLayer>
    </v-card>
</template>

<script>
import { mdiCloudUploadOutline } from '@mdi/js'
import Spinner from '@/layouts/components/Spinner.vue'
import ExtensionFileWithNameError from '@/layouts/components/case7/errors/ExtensionFileWithNameError.vue'
import EmptyFileWithNameError from '@/layouts/components/case7/errors/EmptyFileWithNameError.vue'
import ApiError from '@/layouts/components/case7/errors/ApiError.vue'
import Success from '@/layouts/components/case7/errors/Success.vue'
import DataLayer from '@/layouts/components/case7/DataLayer.vue'
import axios from "axios";
import { getAuth } from "firebase/auth";
import SuccessAnalyze from '@/layouts/components/case7/errors/SuccessAnalyze.vue'
import { file } from 'jszip'
const auth = getAuth();

const urlAnalyze = process.env.VUE_APP_SERVER_7 + process.env.VUE_APP_ANALIZE_ENDPOINT;
const urlSegment = process.env.VUE_APP_SERVER_7 + process.env.VUE_APP_SEGMENT_ENDPOINT;
const urlPatienFiles = process.env.VUE_APP_SERVER_7 + process.env.VUE_APP_PATIENTS_ENDPOINT;

export default {
    components: {
        Spinner,
        ExtensionFileWithNameError,
        EmptyFileWithNameError,
        ApiError,
        Success,
        DataLayer,
        SuccessAnalyze
    },
    data() {
        return {
            option: '',
            resultLayer: null,
            fileInputKey: 0,
            storedImage: [],
            processedImages: null,
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
            this.reset();
            this.showSpinner();
            setTimeout(() => this.hideSpinner(), 2500);
            this.radioButton = event.target.value;
            setTimeout(() => this.show('fileContent'), 2500);
        },
        selectedOption(event) {
            this.option = event;
            this.reset();
            this.hide('fileContent')

            this.showSpinner();
            setTimeout(() => this.hideSpinner(), 2500);
            setTimeout(() => this.show('fileContent'), 2500);

        },
        getFiles() {
            this.uploadElementFile('fileUpload')
        },
        async onFilesChange(event) {
            var files = event.target.files;
            this.hide('fileContent')
            this.resetNoButton();
            this.showSpinner();
            if (this.radioButton == 'A') {
                setTimeout(() => this.apiCallAnalyze(files), 2500);
            } else {
                setTimeout(() => this.apiCallSegment(files), 2500);
            }
        },
        async apiCallAnalyze(files) {
            if (this.checkExtensionFile(files[0]) === false) {
                this.show('extentionFileError');
                return;
            }
            if (this.checkEmptyFile(files[0]) === false) {
                this.show('emptyFileError')
                return;
            }

            let formData = new FormData();
            formData.append('file', files[0]);
            formData.append('mriImage', files[0].name.replace('.nii.gz', ''));
            formData.append('date', '2022_09_10');

            const params = new URLSearchParams({
                mriImage: files[0].name.replace('.nii.gz', ''),
                date: '2022_09_10',
            }).toString();
            let urlToPost = urlAnalyze + '?' + params;

            await axios
                .post(urlToPost, formData, {
                    headers: {
                        'accept': 'application/json',
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(response => {
                    this.resultLayer = response.data;
                    this.hideSpinner();
                    this.show('sucessAnalyze');
                    setTimeout(() => this.hide('sucessAnalyze'), 2500);
                    setTimeout(() => this.show('fileContent'), 2500);
                    this.show('result');
                    this.clear();
                })
                .catch(error => {
                    this.hideSpinner();
                    this.show('errorApiFile');
                })
                .finally(() => this.loading = false)
        },
        async apiCallSegment(files) {
            if (this.checkExtensionFile(files[0]) === false) {
                this.show('extentionFileError');
                return;
            }
            if (this.checkEmptyFile(files[0]) === false) {
                this.show('emptyFileError')
                return;
            }

            let formData = new FormData();

            formData.append('file', files[0]);
            formData.append('mriImage', files[0].name.replace('.nii.gz', ''));
            formData.append('date', '2022_09_10');
            formData.append('model', '0');

            const params = new URLSearchParams({
                mriImage: files[0].name.replace('.nii.gz', ''),
                date: '2022_09_10',
                model: '0'
            }).toString();
            let urlToPost = urlSegment + '?' + params;
            console.log(this.processedImages)
            await axios({
                method: 'post',
                url: urlToPost,
                data: formData,
                responseType: 'arraybuffer'
            }).then(response => {
                let contentDisposition = response.headers['content-disposition']
                let filename = contentDisposition.split('filename=')[1].split(';')[0];
                this.info = response.data;
                this.hideSpinner();
                this.saveImage(filename)

                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', filename); //or any other extension
                document.body.appendChild(link);
                link.click();

                this.show('sucess');
                setTimeout(() => this.hide('sucess'), 2500);
                setTimeout(() => this.show('fileContent'), 2500);
                this.clear();
            })
                .catch(error => {
                    console.error(error)
                    this.hideSpinner();
                    this.show('errorApiFile');
                })
                .finally(() => this.loading = false)
        },
        async apiCallPatients() {
            let formData = new FormData();

            await axios
                .post(urlPatienFiles, formData, {
                    headers: {
                        'accept': 'application/json',
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(response => {
                    this.info = response.data;
                    this.hideSpinner();
                    this.show('result');
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
            this.hide('sucessAnalyze');
            this.hide('extentionFileError');
            this.hide('sucess');
            this.hide('errorApiFile');
            this.hide('result');
            this.hide('fileContent')
        },
        resetNoButton() {
            this.hideSpinner();
            this.hide('sucessAnalyze');
            this.hide('extentionFileError');
            this.hide('sucess');
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
            if (!file.name.includes(".nii.gz") && !file.name.includes(".nii.gz")) {
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
        },
        saveImage(filename) {
            let imageUrl = process.env.VUE_APP_SERVER_7 + '/images/' + filename;
            if (this.processedImages === null) {
                this.processedImages = { "images":  []};
            }
            this.processedImages['images'].push({'url': imageUrl, 'label': filename})
            this.storedImage = filename
        }
    },
    beforeMount() {
        auth.onAuthStateChanged(function (user) {
            if (!user) { // not logged in
                window.location.href = "/";
            }
        })
    },
    watch: {
        storedImage(image) {
            console.log("New image "+image+" added")
            localStorage.setItem('images', JSON.stringify(this.processedImages));
        }
    },
    async mounted() {
        if (!this.processedImages)
        {
            if (typeof localStorage !== 'undefined') {
                if (localStorage.getItem('images') !== null) {
                    this.processedImages = JSON.parse(localStorage.getItem('images'))
                }
            }
        }
    }
}
</script>