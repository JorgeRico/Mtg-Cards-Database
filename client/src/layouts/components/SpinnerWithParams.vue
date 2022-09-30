<template>
    <div :id="spinnerName" class="invisible">
        <div class="spinner"></div>
    </div>
</template>

<script>
export default {
    props: {
        spinnerName: {
            type: String,
            default: '',
        },
    },
}
</script>