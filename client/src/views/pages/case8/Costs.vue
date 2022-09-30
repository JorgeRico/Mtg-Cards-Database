<template>
    <v-card flat class="pa-3 mt-2" style="overflow: hidden;">
        <v-card-text class="d-flex">
            <div cols="12" class="w-100">
                <h1>Gestión de costes <span class="f18">(Calculados para el ámbito de Primária y Urgencias)
                    </span></h1>
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
        <div id="options" class="invisible">
            <v-card-text class="d-flex">
                <div id="regions" cols="12" class="w-100 pb20">
                    <h2 class="mt-5 mb-5">Selecciona una región</h2>
                    <div v-for="(item, i) in this.regionList" :key="i">
                        <div v-if="i != 9" class="regionImpacto w-200px" :id="item.id"
                            @click="selectRegion(item.region)">
                            <strong>{{ item.nombre_region }}</strong>
                        </div>
                        <div v-if="i == 3" class="left w-100 mb-5"></div>
                    </div>
                </div>
            </v-card-text>

            <v-card-text class="d-flex">
                <div id="pathologies" cols="12" class="w-100 pb20">
                    <h2 class="mt-5 mb-5">Patologías</h2>
                    <div v-for="(item, i) in this.patologiesList" :key="i" :id="item.name" class="pathology-box"
                        @click="selectPathology(item.name)">
                        <strong>{{ item.name }}</strong>
                    </div>
                </div>
            </v-card-text>

            <v-card-text class="d-flex mt-5">
                <div id="date" cols="12" class="w-100 pb20">
                    <h3><strong>Selecciona una fecha para cálculo:</strong></h3>
                    <datepicker id="startDateInput" class="mt-5 datepicker" v-model="date" :language="es"
                        :open-date="start" :disabledDates="disabledDates" :monday-first="monday"
                        placeholder="Selecciona una fecha" @closed="onChangeDatepicker">
                    </datepicker>
                </div>
            </v-card-text>

            <v-card-text class="d-flex mt-7">
                <v-btn id="buttonCost" color="primary" class="me-3" @click="generateCost">
                    <span class="d-none d-sm-block">Cálculo de costes</span>
                </v-btn>
            </v-card-text>
        </div>

        <SpinnerWithParams class="p20" :spinnerName="resultSpinner"></SpinnerWithParams>

        <div id="costs" class="invisible">
            <v-card-text class="d-flex mt-7">
                <CostDataLayer :costs="this.costsList"></CostDataLayer>
            </v-card-text>
        </div>

        <v-card-text class="d-flex">
            <CostEmptyRegionError></CostEmptyRegionError>
        </v-card-text>
        <v-card-text class="d-flex">
            <CostDateError></CostDateError>
        </v-card-text>
        <v-card-text class="d-flex">
            <CostEmptyPathologyError></CostEmptyPathologyError>
        </v-card-text>
        <v-card-text class="d-flex">
            <CostEmptyResultError></CostEmptyResultError>
        </v-card-text>
        <v-card-text class="d-flex">
            <ApiError></ApiError>
        </v-card-text>
    </v-card>
</template>

<style>
.vdp-datepicker__calendar {
    top: -285px;
}
</style>
  
<script>
import Spinner from '@/layouts/components/Spinner.vue'
import ApiError from '@/layouts/components/case8/errors/ApiError.vue'
import SpinnerWithParams from '@/layouts/components/SpinnerWithParams.vue';
import CostEmptyRegionError from '@/layouts/components/case8/errors/cost/CostEmptyRegionError.vue';
import CostDateError from '@/layouts/components/case8/errors/cost/CostDateError.vue';
import CostEmptyResultError from '@/layouts/components/case8/errors/cost/CostEmptyResultError.vue';
import CostEmptyPathologyError from '@/layouts/components/case8/errors/cost/CostEmptyPathologyError.vue';
import CostDataLayer from '@/layouts/components/case8/CostDataLayer.vue';
import Datepicker from 'vuejs-datepicker';
import { es } from 'vuejs-datepicker/dist/locale';
import moment from 'moment';

import axios from "axios";

const urlListaRegionAll = process.env.VUE_APP_SERVER_8 + process.env.VUE_APP_LISTA_REGION_ALL
const urlListaPatologias = process.env.VUE_APP_SERVER_8 + process.env.VUE_APP_LISTA_PATOLOGIAS
const urlListaCostes = process.env.VUE_APP_SERVER_8 + process.env.VUE_APP_LISTA_COSTES

import { getAuth } from "firebase/auth";
const auth = getAuth();

export default {
    components: {
        ApiError,
        Spinner,
        Datepicker,
        SpinnerWithParams,
        CostEmptyRegionError,
        CostDateError,
        CostEmptyResultError,
        CostEmptyPathologyError,
        CostDataLayer,
    },
    data() {
        return {
            regionList: [],
            patologiesList: [],
            costsList: [],
            // datepicker
            es: es,
            date: null,
            start: new Date(2018, 12, 1),
            disabledDates: {
                to: new Date(2018, 12, 1),
            },
            monday: true,
            // ----
            selectedComunity: null,
            // hardcoded
            canarias: 1,
            valencia: 2,
            // ----
            selectedDate: null,
            selectedRegion: null,
            selectedPathologyItem: null,
            resultSpinner: 'resultSpinner',
        }
    },
    methods: {
        reset() {
            this.hide('options');
            this.hide('costs');

            // reset selected pathology
            this.selectPathologyReset();
            this.selectedPathologyItem = null;

            // reset selected date
            this.date = null;
            this.selectedDate = null;

            // reset selected region
            this.selectedRegionReset();
            this.selectedRegion = null;
        },
        selectComunityOption(id) {
            this.reset()
            this.selectedComunity = id;
            this.checkSelectedComunity(id);
            this.showHideRegionListItems(id);
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

            this.showSpinner();
            setTimeout(() => this.hideSpinner(), 2000);
            setTimeout(() => this.show('options'), 2000);
        },
        showHideRegionListItems(id) {
            for (var i = 0; i < this.regionList.length; i++) {
                var element = document.getElementById(this.regionList[i].id);
                if (parseInt(id) == this.regionList[i].comunidad) {
                    element.classList.add('visible');
                    element.classList.remove('invisible');
                } else {
                    element.classList.add('invisible');
                    element.classList.remove('visible')
                }
            }
        },
        selectRegion(idRegion) {
            this.selectedRegionItem(idRegion);
            this.selectedRegion = idRegion
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
        selectedRegionReset() {
            for (var i = 0; i < this.regionList.length; i++) {
                var element = document.getElementById(this.regionList[i].id);
                element.classList.remove("selectedRegion");
            }
        },
        selectPathology(id) {
            var selectedRegionItem = null;

            for (var i = 0; i < this.patologiesList.length; i++) {
                var element = document.getElementById(this.patologiesList[i].name);
                element.classList.remove("selectedPathology");

                if (id == this.patologiesList[i].name) {
                    selectedRegionItem = element
                }
            }

            selectedRegionItem.classList.add("selectedPathology");
            this.selectedPathologyItem = id;
        },
        selectPathologyReset() {
            for (var i = 0; i < this.patologiesList.length; i++) {
                var element = document.getElementById(this.patologiesList[i].name);
                element.classList.remove("selectedPathology");
            }
        },
        checkErrorsBeforeSendAlarm() {
            var error = false;

            if (this.selectedRegion == null) {
                setTimeout(() => this.hide('resultSpinner'), 2000);
                setTimeout(() => this.show('costEmptyRegionError'), 2000);
                error = true;
            }

            if (this.selectedPathologyItem == null) {
                setTimeout(() => this.hide('resultSpinner'), 2000);
                setTimeout(() => this.show('costEmptyPathologyError'), 2000);
                error = true;
            }

            if (this.selectedDate == null) {
                setTimeout(() => this.hide('resultSpinner'), 2000);
                setTimeout(() => this.show('costDateError'), 2000);
                error = true;
            }

            if (error == true) {
                return false;
            }

            return true;
        },
        resetGenerate() {
            this.show('resultSpinner');
            this.hide('costEmptyPathologyError');
            this.hide('costDateError');
            this.hide('costEmptyRegionError');
            this.hide('costs');
        },
        generateCost() {
            this.resetGenerate();
            if (this.checkErrorsBeforeSendAlarm() === true) {
                var params = {
                    'fecha': this.selectedDate,
                    'region': this.selectedRegion,
                    'patologia': this.selectedPathologyItem
                }
                this.getCosts(params);
            }
        },
        onChangeDatepicker() {
            this.selectedDate = this.transformDate(this.date);
            this.addDateBorder('startDateInput');
        },
        addDateBorder(id) {
            var element = document.getElementById(id);
            element.classList.remove("selectedDate");
            element.classList.add("selectedDate");
        },
        transformDate(date) {
            var formattedDate = moment(date).format('DD/MM/YYYY');
            return formattedDate;
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
        async getCosts(params) {
            await axios
                .get(urlListaCostes, { 'params': params })
                .then(response => {
                    this.costsList = response.data;

                    if (this.costsList.length == 0) {
                        setTimeout(() => this.hide('resultSpinner'), 2000);
                        setTimeout(() => this.show('costEmptyResultError'), 2000);
                    } else {
                        for (var i = 0; i < this.costsList.length; i++) {
                            this.costsList[i].recepcion = this.reduceDecimalValues(this.costsList[i].recepcion);
                            this.costsList[i].cost_rece = this.reduceDecimalValues(this.costsList[i].cost_rece);
                            this.costsList[i].cost_mani = this.reduceDecimalValues(this.costsList[i].cost_mani);
                            this.costsList[i].cost_pruebas = this.reduceDecimalValues(this.costsList[i].cost_pruebas);
                            this.costsList[i].cost1 = this.reduceDecimalValues(this.costsList[i].cost1);
                            this.costsList[i].cost2 = this.reduceDecimalValues(this.costsList[i].cost2);
                            this.costsList[i].cost_total_baix = this.reduceDecimalValues(this.costsList[i].cost_total_baix);
                            this.costsList[i].cost_total_alt = this.reduceDecimalValues(this.costsList[i].cost_total_alt);
                        }
                        setTimeout(() => this.hide('resultSpinner'), 2000);
                        setTimeout(() => this.show('costs'), 2000);
                    }
                })
                .catch(error => {
                    this.show('errorApiFile');
                    setTimeout(() => this.hide('errorApiFile'), 2500);
                })
                .finally(() => this.loading = false)
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
        reduceDecimalValues(value) {
            if (value != '0') {
                var toFloat = parseFloat(value);
                return toFloat.toFixed(2);
            } else {
                return value;
            }
        },
    },
    mounted() {

    },
    beforeMount() {
        auth.onAuthStateChanged(function (user) {
            if (!user) { // not logged in
                window.location.href = "/";
            }
        })
        this.getListaRegionAll();
        this.getListaPatologias();
    }
}
</script>
  