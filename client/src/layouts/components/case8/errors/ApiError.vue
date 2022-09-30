<template>
    <v-col id="errorApiFile" class="invisible" cols="12" style="padding: 20px 0 0 0;">
        <v-alert color="error" outlined prominent border="left" text class="mb-0">
            <div class="d-flex align-start">
                <v-icon color="error">
                    {{ icons.mdiAlertOutline }}
                </v-icon>
                <div class="ms-3">
                    <p class="text-base font-weight-medium mb-1">
                        Se ha producido un error al procesar la información.
                    </p>
                    <p class="text-base font-weight-medium mb-1">
                        <span class="text-sm">Vuelve a intentarlo más tarde o ponte en contacto con el
                            administrador.</span>
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