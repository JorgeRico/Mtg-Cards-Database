<template>
    <div id="setResult" class="mt-5 w-100">
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
                            <th class="text-uppercase w-50px">
                                <p class="mb-0 center" cols="6">
                                    OWNED CARDS
                                </p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, i) in sets" :key="i"
                            :style="item.complete == 1 ? 'background: #28a745' : item.ownedCards > 0 ? 'background: #ffc107' : ''">

                            <td class="text-uppercase w-40">
                                {{ item.id }}
                            </td>
                            <td class="text-uppercase w-40">
                                <p class="mb-0 center" cols="6">
                                    <router-link :to="{ name: 'setcards', params: { 'id': item.id } }">
                                        {{ item.setName }}
                                    </router-link>
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
                            <td class="text-uppercase w-40">
                                <p class="mb-0 center" cols="6">
                                    {{ item.ownedCards }}
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
            default: [],
        },
    },
    methods: {
        
    },
}
</script>