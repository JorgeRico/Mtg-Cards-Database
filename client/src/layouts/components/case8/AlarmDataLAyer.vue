<template>
    <div id="alarmResults" class="invisible w-100">
        <h3 class="mb-5 mt-5">Alarmas activas: Concentración de gas detectado por la estación, representado en
            microgramos/metro cúbico.</h3>
        <div v-for="(item, i) in activeAlarms" :key="i">
            <v-simple-table class="border-grey mb-5">
                <template>
                    <thead>
                        <tr>
                            <th class="text-uppercase w-150px">
                                <p class="mb-0 center" cols="6">
                                    Municipio
                                </p>
                            </th>
                            <th class="text-uppercase w-150px">
                                <p class="mb-0 center" cols="6">
                                    Estación
                                </p>
                            </th>
                            <th class="text-uppercase w-150px">
                                <p class="mb-0 center" cols="6">
                                    Fecha
                                </p>
                            </th>
                            <th class="text-uppercase w-150px">
                                <p class="mb-0 center" cols="6">
                                    Índice
                                </p>
                            </th>
                            <th class="text-uppercase w-150px">
                                <p class="mb-0 center" cols="6">
                                    Contaminante
                                </p>
                            </th>
                            <th class="text-uppercase w-200px">
                                <p class="mb-0 center" cols="6">
                                    Valor
                                </p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="text-uppercase w-40">
                                <p class="mb-0 center" cols="6">
                                    {{ item.municipio }}
                                </p>
                            </td>
                            <td class="text-uppercase w-40">
                                <p class="mb-0 center" cols="6">
                                    {{ item.id_estacion }}
                                </p>
                            </td>
                            <td class="text-uppercase w-40">
                                <p class="mb-0 center" cols="6">
                                    {{ item.fecha }}
                                </p>
                            </td>
                            <td class="text-uppercase w-40">
                                <p class="mb-0 center" cols="6">
                                    {{ item.limite_index }}
                                </p>
                            </td>
                            <td class="text-uppercase w-40">
                                <p class="mb-0 center" cols="6">
                                    {{ item.contaminante }}
                                </p>
                            </td>
                            <td class="w-40">
                                <p class="mb-0 center" cols="6">
                                    {{ item.valor }} mg /m<sup>3</sup>
                                </p>
                            </td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </div>
    </div>
</template>

<script>
export default {
    setup() {
        return {
        }
    },
    props: {
        activeAlarms: {
            type: Array,
            default: null,
        },
    },
}
</script>