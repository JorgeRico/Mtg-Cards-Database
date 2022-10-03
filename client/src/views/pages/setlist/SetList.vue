<template>
    <v-card flat class="pa-3 mt-2" style="overflow: hidden;">
        <v-card-text class="d-flex">
            <div cols="12" class="w-100">
                <h1>MTG Sets</h1>
                <SetList :sets="sets"></SetList>
                <!-- <div cols="5" class="left mt-10 comunity-box w-49" :id="canarias" :data-id="canarias"
                    @click="selectComunityOption(canarias)">
                    Canarias
                </div>
                <div cols="5" class="right mt-10 comunity-box w-49" :id="valencia" :data-id="valencia"
                    @click="selectComunityOption(valencia)">
                    Comunidad Valenciana
                </div> -->
            </div>
        </v-card-text>
        <!-- <ApiError></ApiError> -->
    </v-card>
</template>

<!-- <style>
.vdp-datepicker__calendar {
    top: -285px;
}
</style> -->
  
<script>
// import Spinner from '@/layouts/components/Spinner.vue'
// import SpinnerWithParams from '@/layouts/components/SpinnerWithParams.vue'
// import ApiError from '@/layouts/components/case8/errors/ApiError.vue'
import SetList from '@/layouts/components/setlist/SetList.vue';
// import UserPatientDataLayer from '@/layouts/components/case8/UserPatientDataLayer.vue';
// import AlarmEmptyError from "@/layouts/components/case8/errors/active/AlarmEmptyError.vue";
// import UsersEmptyError from "@/layouts/components/case8/errors/active/UsersEmptyError.vue";
// import DateEmptyError from '@/layouts/components/case8/errors/active/DateEmptyError.vue';
// import Datepicker from 'vuejs-datepicker';
// import { es } from 'vuejs-datepicker/dist/locale';
// import moment from 'moment';

import axios from "axios";

const urlSetList = process.env.VUE_APP_API_SERVER + process.env.VUE_APP_API_SET_ENDPOINT;
// const urlListaLimite = process.env.VUE_APP_SERVER_8 + process.env.VUE_APP_LISTA_LIMITE
// const urlListaContaminante = process.env.VUE_APP_SERVER_8 + process.env.VUE_APP_LISTA_CONTAMINANTE
// const urlListaRegionAll = process.env.VUE_APP_SERVER_8 + process.env.VUE_APP_LISTA_REGION_ALL
// const urlListaUsuariosEstacion = process.env.VUE_APP_SERVER_8 + process.env.VUE_APP_LISTA_USUARIOS_ESTACION
// const urlListaEstaciones = process.env.VUE_APP_SERVER_8 + process.env.VUE_APP_LISTA_ESTACIONES

import { getAuth } from "firebase/auth";

const auth = getAuth();

export default {
    components: {
        SetList,
    },
    data() {
        return {
            sets: null,
            page: null,
        }
    },
    methods: {
        async getSetList() {
            await axios
                .get(urlSetList)
                .then(response => {
                    this.sets = response.data.data;
                })
                .catch(error => {
                    console.log('error')
                    // this.show('errorApiFile');
                    // setTimeout(() => this.hide('errorApiFile'), 2500);
                })
                .finally(() => this.loading = false)
        },
        // onChangeDatepicker() {
        //     this.selectedDate = this.transformDate(this.date);
        //     this.addDateBorder('startDateInput');
        // },
        // addDateBorder(id) {
        //     var element = document.getElementById(id);
        //     element.classList.remove("selectedDate");
        //     element.classList.add("selectedDate");
        // },
        // transformDate(date) {
        //     var formattedDate = moment(date).format('DD/MM/YYYY');
        //     return formattedDate;
        // },
        // reset() {
        //     // hide divs
        //     this.hide('content')
        //     this.hide('mapCanarias')
        //     this.hide('mapValencia')
        //     this.hide('regionsInfo')
        //     this.hide('satationsInfo')
        //     this.hide('alarmButton')
        //     this.hide('usersResult')
        //     this.hide('alarmResults')
        // },
        // checkSelectedComunity(id) {
        //     if (id == this.canarias) {
        //         this.addComunitySelected(this.canarias)
        //         this.removeComunitySelected(this.valencia)
        //     }

        //     if (id == this.valencia) {
        //         this.addComunitySelected(this.valencia)
        //         this.removeComunitySelected(this.canarias)
        //     }

        //     this.selectedComunity = id;
        //     this.showSpinner();
        //     setTimeout(() => this.hideSpinner(), 1000);
        //     setTimeout(() => this.show('content'), 1000);
        // },
        // showHideRegionListItems(id) {
        //     for (var i = 0; i < this.regionList.length; i++) {

        //         if (id == this.regionList[i].comunidad) {
        //             this.show(this.regionList[i].nombre_region);
        //         } else {
        //             this.hide(this.regionList[i].nombre_region);
        //         }

        //         var element = document.getElementById(this.regionList[i].nombre_region);
        //         element.classList.remove("selected");
        //     }

        //     this.show('regionsInfo');
        // },
        // showComunityMap(id) {
        //     if (id == this.canarias) {
        //         this.show('mapCanarias')
        //     } else {
        //         this.show('mapValencia')
        //     }
        // },
        // selectComunityOption(id) {
        //     this.reset()
        //     this.checkSelectedComunity(id);
        //     this.showHideRegionListItems(id);
        //     this.showComunityMap(id);
        // },
        // addComunitySelected(id) {
        //     var element = document.getElementById(id);
        //     element.classList.remove("selectedComunity");
        //     element.classList.add("selectedComunity");
        // },
        // removeComunitySelected(id) {
        //     var element = document.getElementById(id);
        //     element.classList.remove("selectedComunity");
        // },
        // markSelectedRegion(id) {
        //     var selectedItem = null;
        //     this.hide('usersResult');
        //     this.hide('alarmResults');
        //     this.hide('alarmButton');
        //     for (var i = 0; i < this.regionList.length; i++) {
        //         var element = document.getElementById(this.regionList[i].nombre_region);
        //         if (this.regionList[i].region == id) {
        //             selectedItem = element;
        //         } else {
        //             element.classList.remove("selected");
        //         }
        //     }

        //     this.selectedRegion = id;
        //     selectedItem.classList.add("selected");
        // },
        // selectRegionShowStations(id) {
        //     this.markSelectedRegion(id);
        //     this.hide('usersResult');
        //     this.hide('alarmButton');
        //     this.hide('alarmResults');
        //     this.show('spinnerStations');
        //     this.hide('satationsInfo');
        //     setTimeout(() => this.hide('spinnerStations'), 2500);
        //     var params = {
        //         'region': id
        //     }
        //     this.urlListaEstacionesByRegion(params);
        //     this.resetStations();
        //     setTimeout(() => this.show('satationsInfo'), 2500);
        // },
        // resetStations() {
        //     for (var i = 0; i < this.stationsList.length; i++) {
        //         var element = document.getElementById(this.stationsList[i].id_estacion);
        //         element.classList.remove("selected");
        //     }
        // },
        // selectEstacion(id) {
        //     this.selectedStacion = id

        //     for (var i = 0; i < this.stationsList.length; i++) {
        //         var element = document.getElementById(this.stationsList[i].id_estacion);
        //         element.classList.remove("selected");
        //     }
        //     var element = document.getElementById(id);
        //     element.classList.add("selected");

        //     this.show('alarmButton');
        // },
        // checkDateBeforeSubmit() {
        //     if (this.selectedDate == null) {
        //         this.show('dateEmptyError');
        //         return true;
        //     }

        //     return false;
        // },
        // generateAlarm() {
        //     this.hide('usersResult');
        //     this.hide('alarmResults');
        //     this.hide('alarmEmptyError')
        //     this.hide('usersEmptyError');
        //     this.hide('dateEmptyError');

        //     var error = this.checkDateBeforeSubmit();

        //     if (error === false) {
        //         this.show('spinnerAlarm');
        //         var params = {
        //             'fecha': this.selectedDate,
        //             'region': this.selectedRegion,
        //             'id_estacion': this.selectedStacion
        //         }
        //         this.getAlarmasActivas(params);
        //     }
        // },
        // async getListaContaminante() {
        //     await axios
        //         .get(urlListaContaminante)
        //         .then(response => {
        //             this.contaminantList = response.data;
        //         })
        //         .catch(error => {
        //             this.show('errorApiFile');
        //             setTimeout(() => this.hide('errorApiFile'), 2500);
        //         })
        //         .finally(() => this.loading = false)
        // },
        // async getListaLimite() {
        //     await axios
        //         .get(urlListaLimite)
        //         .then(response => {
        //             this.limitList = response.data;
        //         })
        //         .catch(error => {
        //             this.show('errorApiFile');
        //             setTimeout(() => this.hide('errorApiFile'), 2500);
        //         })
        //         .finally(() => this.loading = false)
        // },
        // async getListaRegionAll() {
        //     await axios
        //         .get(urlListaRegionAll)
        //         .then(response => {
        //             this.regionList = response.data;
        //         })
        //         .catch(error => {
        //             this.show('errorApiFile');
        //             setTimeout(() => this.hide('errorApiFile'), 2500);
        //         })
        //         .finally(() => this.loading = false)
        // },
        // async urlListaEstacionesByRegion(params) {
        //     await axios
        //         .get(urlListaEstaciones, { 'params': params })
        //         .then(response => {
        //             this.stationsList = response.data;
        //         })
        //         .catch(error => {
        //             this.show('errorApiFile');
        //             setTimeout(() => this.hide('errorApiFile'), 2500);
        //         })
        //         .finally(() => this.loading = false)
        // },
        // reduceDecimalValues(value) {
        //     if (value != '0') {
        //         var toFloat = parseFloat(value);
        //         return toFloat.toFixed(5);
        //     } else {
        //         return value;
        //     }
        // },
        // async getAlarmasActivas(params) {
        //     await axios
        //         .get(urlAlarmasActivas, { 'params': params }, {
        //             headers: {
        //                 'accept': 'application/json',
        //             }
        //         })
        //         .then(response => {
        //             this.activeAlarms = response.data;

        //             setTimeout(() => this.hide('spinnerAlarm'), 1500);
        //             if (this.activeAlarms.length == 0) {
        //                 setTimeout(() => this.show('alarmEmptyError'), 1500);
        //             } else {
        //                 for (var i = 0; i < this.activeAlarms.length; i++) {
        //                     this.activeAlarms[i].fecha = this.selectedDate;
        //                     this.activeAlarms[i].valor = this.reduceDecimalValues(this.activeAlarms[i].valor);
        //                 }

        //                 params = {
        //                     'id_estacion': this.selectedStacion
        //                 }
        //                 this.getUsuariosEstacion(params);
        //                 setTimeout(() => this.show('alarmResults'), 1500);
        //             }
        //         })
        //         .catch(error => {
        //             this.show('errorApiFile');
        //             setTimeout(() => this.hide('errorApiFile'), 2500);
        //         })
        //         .finally(() => this.loading = false)
        // },
        // async getUsuariosEstacion(params) {
        //     await axios
        //         .get(urlListaUsuariosEstacion, { 'params': params }, {
        //             headers: {
        //                 'accept': 'application/json',
        //             }
        //         })
        //         .then(response => {
        //             this.users = response.data;
        //             setTimeout(() => this.hide('spinnerAlarm'), 1500);
        //             if (this.users.length == 0) {
        //                 setTimeout(() => this.show('usersEmptyError'), 1500);
        //             } else {
        //                 setTimeout(() => this.show('usersResult'), 1500);
        //             }
        //         })
        //         .catch(error => {
        //             this.show('errorApiFile');
        //             setTimeout(() => this.hide('errorApiFile'), 2500);
        //         })
        //         .finally(() => this.loading = false)
        // },
        // hideSpinner() {
        //     this.hide('spinner');
        // },
        // showSpinner() {
        //     this.show('spinner');
        // },
        // show(id) {
        //     var element = document.getElementById(id);
        //     element.classList.remove("invisible");
        //     element.classList.add("visible");
        // },
        // hide(id) {
        //     var element = document.getElementById(id);
        //     element.classList.remove("visible");
        //     element.classList.add("invisible");
        // },
    },
    mounted() {

    },
    beforeMount() {
        this.getSetList();
        // this.getListaContaminante();
        // this.getListaRegionAll()

        auth.onAuthStateChanged(function (user) {
            if (!user) { // not logged in
                window.location.href = "/";
            }
        })
    }
}
</script>
  