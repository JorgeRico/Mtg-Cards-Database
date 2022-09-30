<template>
    <div class="invisible" id="result">
        <v-card-text class="d-flex">
            <div style="width: 100%">
                <h2 class="mt-10"><strong>Resultados:</strong></h2>
                <div class="left w-45 mt-5">
                    <v-simple-table>
                        <template v-if="this.result">
                            <thead>
                                <tr>
                                    <th class="text-uppercase w-40">
                                        Espondilolistesis
                                    </th>
                                    <th class="text-center text-uppercase">
                                        Valor
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Grado</td>
                                    <td>
                                        <p class="ml-5 mb-0 center" cols="6" v-if="this.result">
                                            <span v-if="this.result.Espondilolistesis[0]"><strong>{{
                                            this.result.Espondilolistesis[0]['grade']}}</strong></span>
                                            <span v-else>No se han encontrado resultados</span>
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Localización</td>
                                    <td>
                                        <p class="ml-5 mb-0 center" cols="6" v-if="this.result">
                                            <span v-if="this.result.Espondilolistesis[0]">
                                                <strong>{{this.result.Espondilolistesis[0]['location']}}</strong></span>
                                            <span v-else>No se han encontrado resultados</span>
                                        </p>
                                    </td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </div>

                <div class="right w-45 mt-5">
                    <v-simple-table>
                        <template v-if="this.result">
                            <thead>
                                <tr>
                                    <th class="text-uppercase w-40">
                                        Fractura
                                    </th>
                                    <th class="text-center text-uppercase">
                                        Valor
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Grado</td>
                                    <td>
                                        <p class="ml-5 mb-0 center" cols="6" v-if="this.result">
                                            <span v-if="this.result.Fracture[0]"><strong>{{
                                            this.result.Fracture[0]['grade']
                                            }}</strong></span>
                                            <span v-else>No se han encontrado resultados</span>
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Localización</td>
                                    <td>
                                        <p class="ml-5 mb-0 center" cols="6" v-if="this.result">
                                            <span v-if="this.result.Fracture[0]"><strong>{{
                                            this.result.Fracture[0]['location']
                                            }}</strong></span>
                                            <span v-else>No se han encontrado resultados</span>
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Tipo</td>
                                    <td>
                                        <p class="ml-5 mb-5 center" cols="6" v-if="this.result">
                                            <span v-if="this.result.Fracture[0]"><strong>{{
                                            this.result.Fracture[0]['type']
                                            }}</strong></span>
                                            <span v-else>No se han encontrado resultados</span>
                                        </p>
                                    </td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </div>

                <div class="left w-45" style="margin-top: 90px">
                    <v-simple-table>
                        <template v-if="this.result">
                            <thead>
                                <tr>
                                    <th class="text-uppercase w-40">
                                        Lordosis
                                    </th>
                                    <th class="text-center text-uppercase">
                                        Valor
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td>
                                        <p class="ml-5 mb-0 center" cols="6" v-if="this.result">
                                            <span v-if="this.result.Lordosis"><strong>{{ this.result.Lordosis
                                            }}</strong></span>
                                            <span v-else>No se han encontrado resultados</span>
                                        </p>
                                    </td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </div>

                <div class="right w-45 mt-10">
                    <v-simple-table>
                        <template v-if="this.result">
                            <thead>
                                <tr>
                                    <th class="text-uppercase w-40">
                                        Tumor
                                    </th>
                                    <th class="text-center text-uppercase">
                                        Valor
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Localización</td>
                                    <td>
                                        <p class="ml-5 mb-0 center" cols="6" v-if="this.result">
                                            <span v-if="this.result.Tumor[0]"><strong>{{
                                            this.result.Tumor[0]['location']
                                            }}</strong></span>
                                            <span v-else>No se han encontrado resultados</span>
                                        </p>
                                    </td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </div>

                <div class="left w-45 mt-10">
                    <v-simple-table>
                        <template v-if="this.result">
                            <thead>
                                <tr>
                                    <th class="text-uppercase w-40">
                                        Modic
                                    </th>
                                    <th class="text-center text-uppercase">
                                        Valor
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Localización</td>
                                    <td>
                                        <p class="ml-5 mb-0 center" cols="6" v-if="this.result">
                                            <span v-if="this.result.Modic[0]"><strong>{{
                                            this.result.Modic[0]['location']
                                            }}</strong></span>
                                            <span v-else>No se han encontrado resultados</span>
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Tipo</td>
                                    <td>
                                        <p class="ml-5 mb-0 center" cols="6" v-if="this.result">
                                            <span v-if="this.result.Modic[0]"><strong>{{
                                            this.result.Modic[0]['location']
                                            }}</strong></span>
                                            <span v-else>No se han encontrado resultados</span>
                                        </p>
                                    </td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>

                </div>

            </div>
        </v-card-text>
    </div>
</template>

<style>
.w-40 {
    width: 40%;
}

.w-45 {
    width: 45%;
}

.left {
    float: left;
}

.right {
    float: right;
}

.center {
    text-align: center;
}
</style>

<script>
import { mdiAlertOutline } from '@mdi/js'

export default {
    props: {
        result: {
            type: Object,
            default: {},
        },
    },
    setup() {
        return {
            icons: {
                mdiAlertOutline
            },
        }
    },

}
</script>