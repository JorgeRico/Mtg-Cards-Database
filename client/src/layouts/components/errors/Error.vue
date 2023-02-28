<template>
    <v-col id="error" class="invisible p0" cols="12">
        <v-alert color="error" outlined prominent text>
            <div class="d-flex align-start">
                <p class="text-base font-weight-medium">
                    <VIcon
                        icon="mdi-alert-outline"
                        size="24"
                    />
                    <span class="ml10">{{ errorMessage }}</span>
                </p>
            </div>
        </v-alert>
    </v-col>
</template>

<script>

export default {
    props: {
        errorMessage: {
            type: String,
            default: '',
        },
    },
    setup() {
        return {

        }
    },

}
</script>