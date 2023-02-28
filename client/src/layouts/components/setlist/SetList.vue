<template>
    <div id="setResult" class="mt-5 w-100">
        <div class="left w-100">
            <VTable class="border-grey mb-10">
                <thead>
                    <tr>
                        <th class="text-uppercase">
                            <p class="mb-0 center">
                                ID
                            </p>
                        </th>
                        <th class="text-uppercase">
                            <p class="mb-0 center">
                                NAME
                            </p>
                        </th>
                        <th class="text-uppercase">
                            <p class="mb-0 center">
                                ABREV
                            </p>
                        </th>
                        <th class="text-uppercase">
                            <p class="mb-0 center">
                                RELEASE DATE
                            </p>
                        </th>
                        <th class="text-uppercase">
                            <p class="mb-0 center">
                                TOTAL CARDS
                            </p>
                        </th>
                        <th class="text-uppercase">
                            <p class="mb-0 center">
                                OWNED CARDS
                            </p>
                        </th>
                        <th class="text-uppercase">
                            <p class="mb-0 center">
                                SPECIAL CARDS
                            </p>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, i) in sets" :key="i"
                        :class="item.complete == 1 ? 'complete' : item.ownedCards > 0 ? 'working' : ''">

                        <td class="text-uppercase">
                            {{ item.id }}
                        </td>
                        <td class="text-uppercase">
                            <div class="left w-25px" v-html="item.setLogo"></div>
                            <p class="right w-90 mb-0">
                                <router-link :to="{ name: 'setcards', params: { 'id': item.id } }">
                                    {{ item.setName }}
                                </router-link>
                            </p>
                        </td>
                        <td class="text-uppercase">
                            <p class="mb-0 center">
                                {{ item.setAbrv }}
                            </p>
                        </td>
                        <td class="text-uppercase">
                            <p class="mb-0 center">
                                {{ item.setReleaseDate }}
                            </p>
                        </td>
                        <td class="text-uppercase">
                            <p class="mb-0 center">
                                {{ item.setTotalCards }}
                            </p>
                        </td>
                        <td class="text-uppercase center">
                            <p :class="item.ownedCards == item.setTotalCards ? 'mb-0 center' : item.specialCards >= 1 ? 'mb-0 center specialCard' : 'mb-0 center'">
                                {{ item.ownedCards }}
                            </p>
                        </td>
                        <td class="text-uppercase center">
                            <p :class="item.ownedCards == item.setTotalCards ? 'mb-0 center' : item.specialCards >= 1 ? 'mb-0 center specialCard' : 'mb-0 center'">
                                {{ item.specialCards }}
                            </p>
                        </td>
                    </tr>
                </tbody>
            </VTable>
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