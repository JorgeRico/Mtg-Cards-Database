<template>
    <div class="w-100 left">
        <h2 class="mb-5">Resultados</h2>
        <v-simple-table v-for="(item, i) in costs" :key="i" style="width: 48%" class="left mr-25 border-grey mb-5">
            <template>
                <thead>
                    <tr>
                        <th class="text-uppercase">
                            <p class="mb-0 center" cols="6">
                                &nbsp;
                            </p>
                        </th>
                        <th class="text-uppercase">
                            <p class="mb-0 center" cols="6">
                                &nbsp;
                            </p>
                        </th>
                        <th class="text-uppercase ">
                            <p class="mb-0 center" cols="6">
                                coste*
                            </p>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="text-uppercase w-40">
                            <p class="mb-0 center f12" cols="6">
                                <strong>Ambito</strong>
                            </p>
                        </td>
                        <td class="text-uppercase w-40">
                            <p class="mb-0 center f16 blueviolet" cols="6">
                                <strong>{{ item.ambito }}</strong>
                            </p>
                        </td>
                        <td class="text-uppercase w-40">
                            <p class="mb-0 center" cols="6">
                                &nbsp;
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-uppercase w-40">
                            <p class="mb-0 center f12" cols="6">
                                <strong>Pacientes (previsión de ingreso)</strong>
                            </p>
                        </td>
                        <td class="text-uppercase w-40">
                            <p class="mb-0 center" cols="6">
                                {{ item.total_pacientes }}
                            </p>
                        </td>
                        <td class="text-uppercase w-40">
                            <p class="mb-0 center" cols="6">
                                &nbsp;
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-uppercase w-40">
                            <p class="mb-0 center f12" cols="6">
                                <strong>Recepción</strong>
                            </p>
                        </td>
                        <td class=" w-40">
                            <p class="mb-0 center" cols="6">
                                {{ item.recepcion }} horas
                            </p>
                        </td>
                        <td class="text-uppercase w-40 text-align-right">
                            <p class="mb-0 center" cols="6">
                                {{ item.cost_rece }} €
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-uppercase w-40">
                            <p class="mb-0 center f12" cols="6">
                                <strong>Maniobras</strong>
                            </p>
                        </td>
                        <td class=" w-40">
                            <p class="mb-0 center" cols="6">
                                {{ item.maniobras }} unidades
                            </p>
                        </td>
                        <td class="text-uppercase w-40 text-align-right">
                            <p class="mb-0 center" cols="6">
                                {{ item.cost_mani }} €
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-uppercase w-40">
                            <p class="mb-0 center f12" cols="6">
                                <strong>Pruebas</strong>
                            </p>
                        </td>
                        <td class=" w-40">
                            <p class="mb-0 center" cols="6">
                                {{ item.pruebas }} unidades
                            </p>
                        </td>
                        <td class="text-uppercase w-40 text-align-right">
                            <p class="mb-0 center" cols="6">
                                {{ item.cost_pruebas }} €
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-uppercase w-40">
                            <p class="mb-0 center f12" cols="6">
                                <strong>Medicamento (más barato)</strong>
                            </p>
                        </td>
                        <td class="text-uppercase w-40">
                            <p class="mb-0 center" cols="6">
                                {{ item.medicament1 }}
                            </p>
                        </td>
                        <td class="text-uppercase w-40  text-align-right">
                            <p class="mb-0 center" cols="6">
                                {{ item.cost1 }} €
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-uppercase w-40">
                            <p class="mb-0 center f12" cols="6">
                                <strong>Medicamento (más caro)</strong>
                            </p>
                        </td>
                        <td class="text-uppercase w-40">
                            <p class="mb-0 center" cols="6">
                                {{ item.medicament2 }}
                            </p>
                        </td>
                        <td class="text-uppercase w-40 text-align-right">
                            <p class="mb-0 center" cols="6">
                                {{ item.cost2 }} €
                            </p>
                        </td>
                    </tr>
                    <tr class="greyfield">
                        <td class="greyfield text-uppercase w-40">
                            <p class="mb-0 center f12" cols="6">
                                &nbsp;
                            </p>
                        </td>
                        <td class="greyfield text-uppercase w-40">
                            <p class="mb-0 center" cols="6">
                                &nbsp;
                            </p>
                        </td>
                        <td class="greyfield text-uppercase w-40">
                            <p class="mb-0 center" cols="6">
                                &nbsp;
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-uppercase w-40">
                            <p class="mb-0 center f12" cols="6">
                                <strong>Total (más barato)</strong>
                            </p>
                        </td>
                        <td class="text-uppercase w-40">
                            <p class="mb-0 center" cols="6">
                                &nbsp;
                            </p>
                        </td>
                        <td class="text-uppercase w-40 text-align-right">
                            <p class="mb-0 center" cols="6">
                                {{ item.cost_total_baix }} €
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-uppercase w-40">
                            <p class="mb-0 center f12" cols="6">
                                <strong>Total (más caro)</strong>
                            </p>
                        </td>
                        <td class="text-uppercase w-40">
                            <p class="mb-0 center" cols="6">
                                &nbsp;
                            </p>
                        </td>
                        <td class="text-uppercase w-40 text-align-right">
                            <p class="mb-0 center" cols="6">
                                {{ item.cost_total_alt }} €
                            </p>
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
        <small class="right mr-30">* Según formula cálculo costes Memoria</small>

    </div>
</template>

<style>
.greyfield {
    height: 3px !important;
    background: lightgrey;
    line-height: 0px;
}
</style>

<script>
export default {
    setup() {
        return {
        }
    },
    props: {
        costs: {
            type: Array,
            default: null,
        }
    },
}
</script>