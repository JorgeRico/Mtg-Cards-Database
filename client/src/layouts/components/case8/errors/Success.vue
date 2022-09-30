<template>
    <v-col id="sucess" class="invisible" cols="12" style="padding: 20px 0 0 0;">
        <v-alert color="success" outlined prominent border="left" text class="mb-0">
            <div class="d-flex align-start">
                <v-icon color="success">
                    {{ icons.mdiAlertOutline }}
                </v-icon>
                <div class="ms-3">
                    <p class="text-base font-weight-medium mb-1">
                        Se ha procesado correctamente la información y se ha descargado un fichero con los resultados.
                    </p>
                </div>
            </div>
        </v-alert>
    </v-col>
</template>

<script>
import { mdiAlertOutline } from '@mdi/js'

export default {
    setup() {
        return {
            icons: {
                mdiAlertOutline
            },
        }
    },

}
</script>