<template>
    <v-col id="success" class="invisible p0" cols="12">
        <v-alert color="success" outlined prominent text class="p0">
            <div class="d-flex align-start">
                <p class="text-base font-weight-medium">
                    <VIcon
                        icon="mdi-alert-outline"
                        size="24"
                    />
                    <span class="ml10">{{ successMessage }}</span>
                </p>
            </div>
        </v-alert>
    </v-col>
</template>

<script>

export default {
    props: {
        successMessage: {
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