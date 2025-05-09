<script setup lang="ts">
    import { ref } from 'vue';

    const props = defineProps<{
        option : number
    }>()

    const text = ref<String>("");

    if (props.option == 0) {
        text.value = "All sets";
    }
    if (props.option == 1) {
        text.value = "Complete sets";
    }
    if (props.option == 2) {
        text.value = "Working sets";
    }
    if (props.option == 3) {
        text.value = "Not Started sets";
    }
    if (props.option == 4) {
        text.value = "Imposible sets";
    }
</script>

<template>
    <h1>
        <strong>Mtg sets ( {{ text }} )</strong>
    </h1>
</template>

<style lang="css" scoped>
    
</style>