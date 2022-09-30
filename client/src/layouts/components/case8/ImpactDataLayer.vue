<template>
    <div>
        <div class="w-49 left">
            <v-simple-table class="border-grey mb-5">
                <template>
                    <thead>
                        <tr>
                            <th class="text-uppercase w-150px">
                                <p class="mb-0" cols="6">
                                    atención primaria
                                </p>
                            </th>
                            <th class="text-uppercase w-150px">
                                <p class="mb-0 center" cols="6">
                                    Valor
                                </p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="text-uppercase w-40">
                                <p class="mb-0 f12" cols="6">
                                    <strong>porcentaje de impacto</strong>
                                </p>
                            </td>
                            <td class="text-uppercase w-40">
                                <p class="mb-0 center" cols="6">
                                    {{ itemPeticion.ap_mean }} %
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td class="text-uppercase w-40 f12">
                                <p class="mb-0" cols="6">
                                    <strong>variación inferior / superior</strong>
                                </p>
                            </td>
                            <td class="text-uppercase w-40">
                                <p class="mb-0 center" cols="6">
                                    {{ itemPeticion.ap_variance }}
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td class="text-uppercase w-40 f12">
                                <p class="mb-0" cols="6">
                                    <strong>predicción</strong>
                                </p>
                            </td>
                            <td class="text-uppercase w-40">
                                <p class="mb-0 center" cols="6">
                                    {{ itemPeticion.ap_prediccion }}
                                </p>
                            </td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </div>
        <div class="w-49 right">
            <v-simple-table class="border-grey mb-5">
                <template>
                    <thead>
                        <tr>
                            <th class="text-uppercase w-150px">
                                <p class="mb-0" cols="6">
                                    Atención urgencias
                                </p>
                            </th>
                            <th class="text-uppercase w-150px">
                                <p class="mb-0 center" cols="6">
                                    Valor
                                </p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="text-uppercase w-40 f12">
                                <p class="mb-0" cols="6">
                                    <strong>porcentaje de impacto</strong>
                                </p>
                            </td>
                            <td class="text-uppercase w-40">
                                <p class="mb-0 center" cols="6">
                                    {{ itemPeticion.ae_mean }} %
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td class="text-uppercase w-40 f12">
                                <p class="mb-0" cols="6">
                                    <strong>variación inferior / superior</strong>
                                </p>
                            </td>
                            <td class="text-uppercase w-40">
                                <p class="mb-0 center" cols="6">
                                    {{ itemPeticion.ae_variance }}
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td class="text-uppercase w-40 f12">
                                <p class="mb-0" cols="6">
                                    <strong>predicción</strong>
                                </p>
                            </td>
                            <td class="text-uppercase w-40">
                                <p class="mb-0 center" cols="6">
                                    {{ itemPeticion.ae_prediccion }}
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
        itemName: {
            type: String,
            default: '',
        },
        itemPeticion: {
            type: Object,
            default: null,
        }
    },
}
</script>