<template>
    <v-col id="errorApiFile" class="invisible p0" cols="12">
        <v-alert color="error" outlined prominent text>
            <div class="d-flex align-start">
                <p class="text-base font-weight-medium">
                    <VIcon
                        icon="mdi-alert-outline"
                        size="24"
                    />
                    <p class="text-base font-weight-medium mb-1">
                        APi error!!!
                    </p>
                    <p class="text-base font-weight-medium mb-1">
                        <span class="text-sm">Fix errors and try again.</span>
                    </p>
                </p>
            </div>
        </v-alert>
    </v-col>
</template>

<script>

export default {
    props: {
        
    },
    setup() {
        return {

        }
    },

}
</script>