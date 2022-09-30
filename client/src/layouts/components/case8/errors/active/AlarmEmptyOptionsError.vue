<template>
    <v-col id="alarmEmptyOptionsError" class="invisible alertPadding" cols="12">
        <v-alert color="error" outlined prominent border="left" text class="mb-0">
            <div class="d-flex align-start">
                <v-icon color="error">
                    {{ icons.mdiAlertOutline }}
                </v-icon>
                <div class="ms-3">
                    <p class="text-base font-weight-medium mb-1">
                        Asegurate de haber seleccionado algun filtro para descargar los usuarios afectados.
                    </p>
                    <p class="text-base font-weight-medium mb-1">
                        Asegurate de haber seleccionado algun método de notificación.
                    </p>
                </div>
            </div>
        </v-alert>
    </v-col>
</template>

<script>
import { mdiAlertOutline } from '@mdi/js'

export default {
    props: {

    },
    setup() {
        return {
            icons: {
                mdiAlertOutline
            },
        }
    },

}
</script>