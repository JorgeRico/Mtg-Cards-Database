<template>
    <v-col id="maxFilesError" class="invisible" cols="12">
        <v-alert color="error" outlined prominent border="left" text class="mb-0">
            <div class="d-flex align-start">
                <v-icon color="error">
                    {{ icons.mdiAlertOutline }}
                </v-icon>
                <div class="ms-3">
                    <p class="text-base font-weight-medium mb-1">
                        Se ha intentado analizar más ficheros de los permitidos (Max. 50).
                    </p>
                    <p class="text-base font-weight-medium mb-1">
                        <span class="text-sm">Vuelve a intentarlo introduciendo la cantidad correcta.</span>
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