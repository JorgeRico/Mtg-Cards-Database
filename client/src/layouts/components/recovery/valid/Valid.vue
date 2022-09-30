<template>
    <v-col id="validRecovery" class="invisible" cols="12" style="padding: 20px 0px 0px 0px">
        <v-alert color="success" outlined prominent border="left" text class="mb-0">
            <div class="d-flex align-start">
                <v-icon color="success">
                    {{ icons.mdiAlertOutline }}
                </v-icon>
                <div class="ms-3">
                    <p class="text-base font-weight-medium mb-1">
                        <strong>{{ errorMessage }}</strong>
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
        errorMessage: {
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