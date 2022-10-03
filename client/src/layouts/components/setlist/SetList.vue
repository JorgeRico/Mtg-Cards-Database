<template>
    <div id="setResult" class="mt-10 w-100">
        <div class="left w-100">
            <v-btn color="primary" class="right me-3 mb-5">
                <span class="d-none d-sm-block">Complete all</span>
            </v-btn>
        </div>
        <div class="left w-100">
            <v-simple-table class="border-grey mb-10">
                <template>
                    <thead>
                        <tr>
                            <th class="text-uppercase w-50px">
                                <p class="mb-0 center" cols="6">
                                    ID
                                </p>
                            </th>
                            <th class="text-uppercase w-50px">
                                <p class="mb-0 center" cols="6">
                                    NAME
                                </p>
                            </th>
                            <th class="text-uppercase w-50px">
                                <p class="mb-0 center" cols="6">
                                    ABREV
                                </p>
                            </th>
                            <th class="text-uppercase w-50px">
                                <p class="mb-0 center" cols="6">
                                    RELEASE DATE
                                </p>
                            </th>
                            <th class="text-uppercase w-50px">
                                <p class="mb-0 center" cols="6">
                                    TOTAL CARDS
                                </p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, i) in sets" :key="i"
                            :style="item.complete == 1 ? 'background: greenyellow' : ''">

                            <td class="text-uppercase w-40">
                                {{ item.id }}
                            </td>
                            <td class="text-uppercase w-40">
                                <p class="mb-0 center" cols="6">
                                    {{ item.setName }}
                                </p>
                            </td>
                            <td class="text-uppercase w-40">
                                <p class="mb-0 center" cols="6">
                                    {{ item.setAbrv }}
                                </p>
                            </td>
                            <td class="text-uppercase w-40">
                                <p class="mb-0 center" cols="6">
                                    {{ item.setReleaseDate }}
                                </p>
                            </td>
                            <td class="text-uppercase w-40">
                                <p class="mb-0 center" cols="6">
                                    {{ item.setTotalCards }}
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
    components: {

    },
    data() {
        return {
        }
    },
    setup() {
        return {
        }
    },
    props: {
        sets: {
            type: Array,
            default: null,
        },
        page: {
            type: String,
            default: '',
        },
    },
    methods: {

    },
}
</script>