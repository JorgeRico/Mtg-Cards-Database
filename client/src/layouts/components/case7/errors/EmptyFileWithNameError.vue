<template>
    <v-col id="emptyFileError" class="invisible" cols="12">
        <v-alert color="error" outlined prominent border="left" text class="mb-0">
            <div class="d-flex align-start">
                <v-icon color="error">
                    {{ icons.mdiAlertOutline }}
                </v-icon>
                <div class="ms-3">
                    <p class="text-base font-weight-medium mb-1">
                        El fichero no contiene datos.
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
        emptyFileError: {
            type: String,
            default: '',
        },
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