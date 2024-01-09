<template>
    <div id="setResult" class="mt-5 w-100">
        <div class="left w-100">
            <VTable class="border-grey mb-10">
                <thead>
                    <tr>
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
                                TOTAL SET CARDS
                            </p>
                        </th>
                        <th class="text-uppercase">
                            <p class="mb-0 center">
                                TOTAL OWNED CARDS
                            </p>
                        </th>
                        <th class="text-uppercase">
                            <p class="mb-0 center">
                                SET CARDS
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
                    <tr v-for="(item, i) in sets" :key="i" :class="(item.complete == 1 && item.setTotalCards == item.ownedCards) ? 'complete' : (item.complete == 1 && item.setTotalCards != item.ownedCards) ? 'softcomplete' : (item.complete != 1 && item.ownedCards > 0) ? 'working' : ''">
                        <td class="text-uppercase">
                            <div class="left w25px" v-html="item.setLogo"></div>
                            <p class="right w-90 mb-0">
                                <router-link :to="{ name: 'setcards', params: { 'id': item.id } }" class="link">
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
                                <strong>{{ item.setTotalCards }}</strong>
                            </p>
                        </td>
                        <td class="text-uppercase center">
                            <p class="mb-0 center">
                                <strong>{{ item.ownedCards }}</strong>
                            </p>
                        </td>
                        <td class="text-uppercase center">
                            <p class="mb-0 center">
                                {{ (item.setTotalCards - item.specialCards) }}
                            </p>
                        </td>
                        <td class="text-uppercase center">
                            <p class="mb-0 center">
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