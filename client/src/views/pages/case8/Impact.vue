<template>
    <v-card flat class="pa-3 mt-2" style="overflow: hidden;">
        <v-card-text class="d-flex">
            <div cols="12" class="w-100">
                <h1>Petición de impacto</h1>
                <div cols="5" class="left mt-10 comunity-box w-49" :id="canarias" :data-id="canarias"
                    @click="selectComunityOption(canarias)">
                    Canarias
                </div>
                <div cols="5" class="right mt-10 comunity-box w-49" :id="valencia" :data-id="valencia"
                    @click="selectComunityOption(valencia)">
                    Comunidad Valenciana
                </div>
            </div>
        </v-card-text>
        <Spinner></Spinner>
        <div id="content" class="invisible">
            <v-card-text class="d-flex">
                <div cols="12" class="w-100 pb20">
                    <h2 class="mt-5 mb-5">Selecciona una región</h2>
                    <div v-for="(item, i) in this.regionList" :key="i">
                        <div class="regionImpacto w-200px" :id="item.id" @click="selectRegion(item.region)">
                            <strong>{{ item.nombre_region }}</strong>
                        </div>
                    </div>
                    <ImpactEmptyRegionError></ImpactEmptyRegionError>
                </div>
            </v-card-text>

            <v-card-text class="d-flex">
                <div id="contaminants" cols="12" class="w-100 pb20">
                    <h2 class="mt-5 mb-5">Contaminantes</h2>
                    <div v-for="(item, i) in this.contaminantList" :key="i">
                        <div v-if="item.simbol == contaminant" class="contamination-box selectedContaminant">
                            <strong>{{ item.simbol }}</strong>
                        </div>
                        <div v-else class="contamination-box not-allowed">
                            <strong>{{ item.simbol }}</strong>
                        </div>
                    </div>
                </div>
            </v-card-text>
            <v-card-text class="d-flex">
                <div id="pathologies" cols="12" class="w-100 pb20">
                    <h2 class="mt-5 mb-5">Patologías</h2>
                    <div>
                        <div v-for="(item, i) in this.patologiesList" :key="i">
                            <div v-if="item.name == pathology" class="pathology-box-impact selectedPathology">
                                <strong>{{ item.name }}</strong>
                            </div>
                            <div v-else class="pathology-box-impact not-allowed">
                                <strong>{{ item.name }}</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </v-card-text>

            <v-card-text class="d-flex mt-7">
                <div id="dateStart" cols="12" class="w-100 pb20">
                    <h3><strong>Selecciona una fecha inicial:</strong></h3>
                    <datepicker id="startDateInput" class="mt-5 datepicker" v-model="startDate" :language="es"
                        :open-date="start" :disabledDates="disabledDates" :monday-first="monday"
                        placeholder="Selecciona una fecha inicial" @closed="onChangeStartDatepicker">
                    </datepicker>
                </div>
            </v-card-text>

            <v-card-text class="d-flex mt-5">
                <div id="dateEnd" cols="12" class="w-100 pb20">
                    <h3><strong>Selecciona una fecha final:</strong></h3>
                    <datepicker id="endDateInput" class="mt-5 datepicker" v-model="endDate" :language="es"
                        :open-date="end" :disabledDates="disabledDates" :monday-first="monday"
                        placeholder="Selecciona una fecha final" @closed="onChangeEndDatepicker">
                    </datepicker>
                </div>
            </v-card-text>

            <v-card-text class="d-flex mt-7">
                <v-btn id="buttonImpact" color="primary" class="me-3" @click="generateImpact">
                    <span class="d-none d-sm-block">Solicitud de petición de impacto</span>
                </v-btn>
            </v-card-text>

            <v-card-text class="d-flex">
                <ImpactEmptyRegionSendError></ImpactEmptyRegionSendError>
            </v-card-text>
            <v-card-text class="d-flex">
                <ImpactDateError></ImpactDateError>
            </v-card-text>
            <v-card-text class="d-flex">
                <ImpactEmptyResultError></ImpactEmptyResultError>
            </v-card-text>

            <SpinnerWithParams class="p20" :spinnerName="resultSpinner"></SpinnerWithParams>

            <div class="invisible" id="resultImpact" style="margin-top: -50px;">
                <v-card-text class="d-flex mt-7">
                    <div cols="12" class="w-100 pb20">
                        <h3>Resultados obtenidos por el modelo estadístico realizado</h3>
                        <div class="right w-100 text-align-right">
                            <v-btn id="buttonAsma" color="primary" class="me-3" @click="downloadFile(asma)">
                                <span class="d-none d-sm-block">descargar resultados</span>
                            </v-btn>
                            <!-- <v-btn id="buttonEpoc" color="primary" class="me-3" @click="downloadFile(epoc)">
                                <span class="d-none d-sm-block">Epoc</span>
                            </v-btn>
                            <v-btn id="buttonRinitis" color="primary" class="me-3" @click="downloadFile(rinitis)">
                                <span class="d-none d-sm-block">Rinitis</span>
                            </v-btn>
                            <v-btn id="buttonBronquitis" color="primary" class="me-3" @click="downloadFile(bronquitis)">
                                <span class="d-none d-sm-block">Bronquitis</span>
                            </v-btn> -->
                        </div>
                        <div class="left w-100 mb-20" v-for="(item, i) in this.peticionImpacto" :key="i">
                            <p class="mb-2"><strong>Provincia:</strong> {{ item.provincia }}</p>
                            <p class="mb-2"><strong>Municipio:</strong> {{ item.municipio }}</p>
                            <p class="mb-4"><strong>Estacion:</strong> estacion_{{ item.id_estacion_medida }}</p>
                            <ImpactDataLayer :itemPeticion="item.asma" :itemName="asma">
                            </ImpactDataLayer>
                            <!-- <ImpactDataLayer :itemPeticion="item.epoc" :itemName="epoc">
                            </ImpactDataLayer>
                            <ImpactDataLayer :itemPeticion="item.rinitis" :itemName="rinitis">
                            </ImpactDataLayer>
                            <ImpactDataLayer :itemPeticion="item.bronquitis" :itemName="bronquitis">
                            </ImpactDataLayer> -->
                        </div>
                    </div>
                </v-card-text>
            </div>
        </div>
    </v-card>
</template>
  
<style>
.vdp-datepicker__calendar {
    top: -285px;
}
</style>

<script>
import Spinner from '@/layouts/components/Spinner.vue';
import SpinnerWithParams from '@/layouts/components/SpinnerWithParams.vue';
import ImpactDataLayer from '@/layouts/components/case8/ImpactDataLayer.vue';
import ImpactEmptyRegionError from '@/layouts/components/case8/errors/impact/ImpactEmptyRegionError.vue';
import ImpactDateError from '@/layouts/components/case8/errors/impact/ImpactDateError.vue';
import ImpactEmptyRegionSendError from '@/layouts/components/case8/errors/impact/ImpactEmptyRegionSendError.vue';
import ImpactEmptyResultError from '@/layouts/components/case8/errors/impact/ImpactEmptyResultError.vue';
import Datepicker from 'vuejs-datepicker';
import { es } from 'vuejs-datepicker/dist/locale';
import moment from 'moment';

import axios from "axios";

const urlListaContaminante = process.env.VUE_APP_SERVER_8 + process.env.VUE_APP_LISTA_CONTAMINANTE
const urlPeticionImpacto = process.env.VUE_APP_SERVER_8 + process.env.VUE_APP_PETICION_IMPACTO
const urlListaPatologias = process.env.VUE_APP_SERVER_8 + process.env.VUE_APP_LISTA_PATOLOGIAS
const urlListaRegionAll = process.env.VUE_APP_SERVER_8 + process.env.VUE_APP_LISTA_REGION_ALL

import { getAuth } from "firebase/auth";
const auth = getAuth();

export default {
    components: {
        Spinner,
        Datepicker,
        ImpactDataLayer,
        ImpactEmptyRegionError,
        ImpactDateError,
        ImpactEmptyRegionSendError,
        ImpactEmptyResultError,
        SpinnerWithParams,
    },
    data() {
        return {
            contaminantList: [],
            peticionImpacto: [],
            patologiesList: [],
            regionList: [],
            // hardcoded
            exceptionRegionList: ['3', '8'],
            canarias: 1,
            valencia: 2,
            asma: 'asma',
            epoc: 'epoc',
            rinitis: 'rinitis',
            bronquitis: 'bronquitis',
            contaminant: 'PM10',
            pathology: 'Asma',
            // ----
            // datepicker
            es: es,
            startDate: null,
            start: new Date(2018, 12, 1),
            endDate: null,
            end: new Date(2018, 12, 1),
            disabledDates: {
                to: new Date(2018, 12, 1),
            },
            monday: true,
            disabledDates: {
                to: new Date(2018, 12, 1),
            },
            // ----
            selectedStartDate: null,
            selectedEndDate: null,
            selectedRegion: null,
            resultSpinner: 'resultSpinner',
        }
    },
    methods: {
        selectRegion(idRegion) {
            this.selectedRegionItem(idRegion);
            this.selectedRegion = idRegion
        },
        resetSendAlarmErrors() {
            this.show('resultSpinner');
            this.hide('resultImpact');
            this.hide('impactEmptyRegionSendError');
            this.hide('impactDateError');
            this.hide('impactEmptyResultError');
        },
        checkErrorsBeforeSendAlarm() {
            var error = false;

            if (this.selectedRegion == null) {
                setTimeout(() => this.hide('resultSpinner'), 2000);
                setTimeout(() => this.show('impactEmptyRegionSendError'), 2000);
                error = true;
            }

            if (this.selectedStartDate == null || this.selectedEndDate == null) {
                setTimeout(() => this.hide('resultSpinner'), 2000);
                setTimeout(() => this.show('impactDateError'), 2000);
                error = true;
            }

            if (this.checkDatesError(this.selectedStartDate, this.selectedEndDate)) {
                setTimeout(() => this.hide('resultSpinner'), 2000);
                setTimeout(() => this.show('impactDateError'), 2000);
                error = true;
            }

            if (error === true) {
                return false;
            }

            return true;
        },
        generateImpact() {
            this.resetSendAlarmErrors();
            var error = this.checkErrorsBeforeSendAlarm();

            if (error === true) {
                var params = {
                    'fecha_inicio': this.transformDateToShow(this.selectedStartDate),
                    'fecha_final': this.transformDateToShow(this.selectedEndDate),
                    'region': this.selectedRegion,
                }
                this.getPeticionImpacto(params);
            }
        },
        checkDatesError(start, end) {
            var startDate = this.getMillisecondsDate(start);
            var endDate = this.getMillisecondsDate(end);

            if (endDate < startDate) {
                return true;
            }

            return false;
        },
        onChangeStartDatepicker() {
            this.selectedStartDate = this.startDate;
            this.addDateBorder('startDateInput');
        },
        onChangeEndDatepicker() {
            this.selectedEndDate = this.endDate;
            this.addDateBorder('endDateInput');
        },
        addDateBorder(id) {
            var element = document.getElementById(id);
            element.classList.remove("selectedDate");
            element.classList.add("selectedDate");
        },
        getMillisecondsDate(date) {
            var formattedDate = moment(date).format('YYYY-MM-DD');
            formattedDate += 'T00:00:00';

            var newDate = new Date(formattedDate);

            return newDate.getTime();
        },
        transformDateToShow(date) {
            var formattedDate = moment(date).format('DD/MM/YYYY');
            return formattedDate;
        },
        selectComunityOption(id) {
            this.reset()
            this.checkSelectedComunity(id);
            this.showHideRegionListItems(id);
        },
        reset() {
            this.hide('content');
            this.hide('impactEmptyRegionError');
            this.hide('resultImpact');
            this.hide('impactEmptyRegionSendError');
            this.hide('impactDateError');
            this.hide('impactEmptyResultError');
        },
        showHideRegionListItems(id) {
            var num = 0;

            for (var i = 0; i < this.regionList.length; i++) {
                if (id == this.regionList[i].comunidad && this.exceptionRegionList.includes(this.regionList[i].region)) {
                    this.show(this.regionList[i].id);
                    num++;
                } else {
                    this.hide(this.regionList[i].id);
                }
            }

            if (num == 0) {
                this.show('impactEmptyRegionError');
                this.hide('content');
                this.hide('contaminants');
                this.hide('pathologies');
                this.hide('dateStart');
                this.hide('dateEnd');
                this.hide('buttonImpact');
            } else {
                this.show('contaminants');
                this.show('pathologies');
                this.show('dateStart');
                this.show('dateEnd');
                this.show('buttonImpact');
            }
        },
        getRegionName(id) {
            var region = '';
            for (var i = 0; i < this.regionList.length; i++) {
                if (id == this.regionList[i].region) {
                    region = this.regionList[i].nombre_region;
                    break;
                }
            }

            return region;
        },
        selectedRegionItem(id) {
            var selectedRegionItem = null;

            for (var i = 0; i < this.regionList.length; i++) {
                var element = document.getElementById(this.regionList[i].id);
                element.classList.remove("selectedRegion");

                if (id == this.regionList[i].region) {
                    selectedRegionItem = element
                }
            }

            selectedRegionItem.classList.add("selectedRegion");
        },
        selectedRegionItemReset() {
            for (var i = 0; i < this.regionList.length; i++) {
                var element = document.getElementById(this.regionList[i].id);
                element.classList.remove("selectedRegion");
            }
        },
        addComunitySelected(id) {
            var element = document.getElementById(id);
            element.classList.remove("selectedComunity");
            element.classList.add("selectedComunity");
        },
        removeComunitySelected(id) {
            var element = document.getElementById(id);
            element.classList.remove("selectedComunity");
        },
        checkSelectedComunity(id) {
            if (id == this.canarias) {
                this.addComunitySelected(this.canarias)
                this.removeComunitySelected(this.valencia)
            }

            if (id == this.valencia) {
                this.addComunitySelected(this.valencia)
                this.removeComunitySelected(this.canarias)
            }

            // reset region
            this.selectedRegion = null;
            this.selectedRegionItemReset();
            this.selectedComunity = id;
            this.showSpinner();
            setTimeout(() => this.hideSpinner(), 1000);
            setTimeout(() => this.show('content'), 1000);
        },
        hideSpinner() {
            this.hide('spinner');
        },
        showSpinner() {
            this.show('spinner');
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
        async getListaContaminante() {
            await axios
                .get(urlListaContaminante)
                .then(response => {
                    this.contaminantList = response.data;
                })
                .catch(error => {
                    this.show('errorApiFile');
                    setTimeout(() => this.hide('errorApiFile'), 2500);
                })
                .finally(() => this.loading = false)
        },
        async getListaPatologias() {
            await axios
                .get(urlListaPatologias)
                .then(response => {
                    this.patologiesList = response.data;
                })
                .catch(error => {
                    this.show('errorApiFile');
                    setTimeout(() => this.hide('errorApiFile'), 2500);
                })
                .finally(() => this.loading = false)
        },
        async getListaRegionAll() {
            await axios
                .get(urlListaRegionAll)
                .then(response => {
                    var items = response.data;
                    for (var i = 0; i < items.length; i++) {
                        var newItem = {
                            'id': 'region-' + items[i].region,
                            'region': items[i].region,
                            'nombre_region': items[i].nombre_region,
                            'comunidad': items[i].comunidad
                        }
                        this.regionList.push(newItem)
                    }
                })
                .catch(error => {
                    this.show('errorApiFile');
                    setTimeout(() => this.hide('errorApiFile'), 2500);
                })
                .finally(() => this.loading = false)
        },
        reduceDecimalValues(value) {
            if (value != '0') {
                var toFloat = parseFloat(value);
                return toFloat.toFixed(5);
            } else {
                return value;
            }
        },
        reduceStringDecimalValues(value) {
            if (value != '0/0') {
                var resultSplitted = value.split('/');
                var toFloatFirst = parseFloat(resultSplitted[0]);
                var toFloatSecond = parseFloat(resultSplitted[1]);

                return toFloatFirst.toFixed(4) + ' / ' + toFloatSecond.toFixed(4);
            } else {
                return value;
            }
        },
        changeDecimalValues(value) {
            value.ae_mean = this.reduceDecimalValues(value.ae_mean);
            value.ap_mean = this.reduceDecimalValues(value.ap_mean);

            value.ae_variance = this.reduceStringDecimalValues(value.ae_variance);
            value.ap_variance = this.reduceStringDecimalValues(value.ap_variance);

            value.ae_prediccion = this.reduceDecimalValues(value.ae_prediccion);
            value.ap_prediccion = this.reduceDecimalValues(value.ap_prediccion);

            return value;

        },
        async getPeticionImpacto(params) {
            await axios
                .get(urlPeticionImpacto, { 'params': params })
                .then(response => {
                    this.peticionImpacto = response.data;
                    if (this.peticionImpacto.length == 0) {
                        setTimeout(() => this.hide('resultSpinner'), 2000);
                        setTimeout(() => this.show('impactEmptyResultError'), 2000);
                    } else {
                        for (var i = 0; i < this.peticionImpacto.length; i++) {
                            this.peticionImpacto[i].asma = this.changeDecimalValues(this.peticionImpacto[i].asma);
                            this.peticionImpacto[i].epoc = this.changeDecimalValues(this.peticionImpacto[i].epoc);
                            this.peticionImpacto[i].rinitis = this.changeDecimalValues(this.peticionImpacto[i].rinitis);
                            this.peticionImpacto[i].bronquitis = this.changeDecimalValues(this.peticionImpacto[i].bronquitis);
                        }
                        setTimeout(() => this.hide('resultSpinner'), 2000);
                        setTimeout(() => this.show('resultImpact'), 2000);
                    }
                })
                .catch(error => {
                    // se comenta porque la api devuelve errores 500 cuando son resultados vacios
                    // this.show('errorApiFile');
                    setTimeout(() => this.hide('resultSpinner'), 2000);
                    setTimeout(() => this.show('impactEmptyResultError'), 2000);
                    setTimeout(() => this.hide('impactEmptyResultError'), 2000);
                })
                .finally(() => this.loading = false)
        },
        getDownloadText(option) {
            var asma = '';
            var epoc = '';
            var bronquitis = '';
            var rinitis = '';
            var text = '';

            for (var i = 0; i < this.peticionImpacto.length; i++) {
                text = this.peticionImpacto[i].provincia + '|' + this.peticionImpacto[i].municipio + '|' + this.peticionImpacto[i].id_estacion_medida + '|' + this.getRegionName(this.region) + '|';
                asma += text + this.peticionImpacto[i].asma.ap_mean + '|' + this.peticionImpacto[i].asma.ae_mean + '|' + this.peticionImpacto[i].asma.ap_variance + '|' + this.peticionImpacto[i].asma.ae_variance + '|' + this.peticionImpacto[i].asma.ap_prediccion + '|' + this.peticionImpacto[i].asma.ae_prediccion + '\r\n';
                epoc += text + this.peticionImpacto[i].epoc.ap_mean + '|' + this.peticionImpacto[i].epoc.ae_mean + '|' + this.peticionImpacto[i].epoc.ap_variance + '|' + this.peticionImpacto[i].epoc.ae_variance + '|' + this.peticionImpacto[i].epoc.ap_prediccion + '|' + this.peticionImpacto[i].epoc.ae_prediccion + '\r\n';
                bronquitis += text + this.peticionImpacto[i].bronquitis.ap_mean + '|' + this.peticionImpacto[i].bronquitis.ae_mean + '|' + this.peticionImpacto[i].bronquitis.ap_variance + '|' + this.peticionImpacto[i].bronquitis.ae_variance + '|' + this.peticionImpacto[i].bronquitis.ap_prediccion + '|' + this.peticionImpacto[i].bronquitis.ae_prediccion + '\r\n';
                rinitis += text + this.peticionImpacto[i].rinitis.ap_mean + '|' + this.peticionImpacto[i].rinitis.ae_mean + '|' + this.peticionImpacto[i].rinitis.ap_variance + '|' + this.peticionImpacto[i].rinitis.ae_variance + '|' + this.peticionImpacto[i].rinitis.ap_prediccion + '|' + this.peticionImpacto[i].rinitis.ae_prediccion + '\r\n';
            }

            if (option == this.asma) {
                return asma;
            }
            if (option == this.epoc) {
                return epoc;
            }
            if (option == this.bronquitis) {
                return bronquitis;
            }
            if (option == this.rinitis) {
                return rinitis;
            }
        },
        downloadFile(option) {
            var dateTime = this.getActualTimeString();
            var element = document.createElement('a');
            var text = this.getDownloadText(option);
            var filename = this.getDownloadFileName(option, dateTime);

            element.setAttribute('href', 'data:application/text;charset=utf-8,' + encodeURIComponent(text));
            element.setAttribute('download', filename);

            element.style.display = 'none';

            document.body.appendChild(element);

            element.click();
            document.body.removeChild(element);
        },
        getActualTimeString() {
            var today = new Date();
            var date = today.getFullYear() + '_' + (today.getMonth() + 1) + '_' + today.getDate();
            var time = today.getHours() + "_" + today.getMinutes() + "_" + today.getSeconds();
            var dateTime = date + '_' + time;

            return dateTime;
        },
        getDownloadFileName(option, dateTime) {
            var filename = option + '_' + dateTime + '.txt';

            return filename;
        },
    },
    mounted() {

    },
    computed: {

    },
    beforeMount() {
        auth.onAuthStateChanged(function (user) {
            if (!user) { // not logged in
                window.location.href = "/";
            }
        });
        this.getListaRegionAll();
        this.getListaContaminante();
        this.getListaPatologias();
    }
}
</script>
  