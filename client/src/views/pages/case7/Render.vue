<template>
    <v-card flat class="pa-3 mt-2">
        <v-card-text class="d-flex">
            <div>
                <h1>Visor 3D</h1>
                <p>Pulsa la tecla <b>V</b> para cambiar de vista</p>
            </div>
        </v-card-text>    
        <div flat v-if="images">
            <v-card-text>
                <h2>Selecciona una imagen</h2>
                <div>
                
                    <v-select
                        :items="images"
                        item-text="label"
                        item-value="url"
                        label="Selecciona una imagen"
                        v-on:change="getImage"

                    ></v-select>
                </div>
            </v-card-text>

            <v-card><canvas id="gl" class="pa-3 mt-2" height="640"></canvas></v-card>
        </div>
        <div v-else flat class="pa-3 pt-0 d-flex" >
            <v-alert prominent type="info">
                <v-row align="center">
                    <v-col class="grow">
                        Primer debes segmentar una imagen. Accede aquí para realizar la operación.
                    </v-col>
                    <v-col class="shrink">
                        <v-btn  :to="{ name: 'case-7' }">Segmentar imagen</v-btn>
                    </v-col>
                </v-row>
            </v-alert>

        </div>
    </v-card>
    
</template>

<script>

import {Niivue} from '@niivue/niivue'
const nv = new Niivue()

export default ({
    data() {
        return {
            images:  null,
            hideAlert: true,
            volumeList: []
        }
    },
    mounted() {
        if (!this.images)
        {   
            if (typeof localStorage !== 'undefined') {
                if (localStorage.getItem('images') !== null) {
                    let processedImages = JSON.parse(localStorage.getItem('images'))
                    if (processedImages) {
                        this.images = processedImages['images'] ?? []    
                    }
                }
            }
        }
    },
    methods: {
        getImage(imgUrl) {
            console.log(imgUrl)
            this.volumeList = [{url: imgUrl}]
            nv.attachTo('gl')
            nv.loadVolumes(this.volumeList) // press the "v" key to cycle through views
            this.hideAlert = true
        }
    }
})
</script>
