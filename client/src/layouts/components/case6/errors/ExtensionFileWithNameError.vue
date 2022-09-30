<template>
    <v-col id="extentionFileError" class="invisible" cols="12">
        <v-alert color="error" outlined prominent border="left" text class="mb-0">
            <div class="d-flex align-start">
                <v-icon color="error">
                    {{ icons.mdiAlertOutline }}
                </v-icon>
                <div class="ms-3">
                    <p class="text-base font-weight-medium mb-1">
                        La extensión del fichero no es correcta.
                    </p>
                    <p class="text-base font-weight-medium mb-1">
                        El fichero <strong>{{ extensionFileError }}</strong> no tiene una extensión correcta.
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
        extensionFileError: {
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