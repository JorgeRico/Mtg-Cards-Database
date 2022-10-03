<template>
    <div id="setResult" class="mt-10 w-100">
        <div class="left w-100">
            <v-btn color="primary" class="right me-3 mb-5">
                <span class="d-none d-sm-block" @click="completeAll">Complete all</span>
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
                                    OWN
                                </p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, i) in cardsList" :key="i"
                            :style="item.own == 1 ? 'background: greenyellow' : ''">

                            <td class="text-uppercase w-40">
                                {{ item.id }}
                            </td>
                            <td class="text-uppercase w-40">
                                <p class="mb-0 center" cols="6">
                                    {{ item.cardName }}
                                </p>
                            </td>
                            <td class="text-uppercase w-40">
                                <p class="mb-0 center" cols="6">
                                    {{ item.own }}
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
import axios from "axios";
import qs from 'qs';

export default {
    components: {

    },
    data() {
        return {
            setId: null,
        }
    },
    setup() {
        return {
        }
    },
    props: {
        cardsList: {
            type: Array,
            default: [],
        },
    },
    methods: {
        completeAll() {
            let text = "Are you sure?!\nEither OK or Cancel.";
            if (confirm(text) == true) {
                text = true;
            } else {
                text = false;
            }
            console.log(text)
            this.setComplete();
        },

        async setComplete() {
            this.urlSetCardsList = process.env.VUE_APP_API_SERVER + process.env.VUE_APP_API_SET_CARDS_ENDPOINT + '/' + this.setId + '/cards';

            await axios({
                method: 'put',
                url: this.urlSetCardsList,
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                data: qs.stringify({ 'own': '1' }),
            })
                .then(response => {
                    // this.cardsList = response.data.data;
                    console.log('ok')
                })
                .catch(error => {
                    console.log('error')
                    // this.show('errorApiFile');
                    // setTimeout(() => this.hide('errorApiFile'), 2500);
                })
                .finally(() => this.loading = false)
        },
    },
    beforeMount() {
        this.setId = this.$route.params.id;
    }
}
</script>