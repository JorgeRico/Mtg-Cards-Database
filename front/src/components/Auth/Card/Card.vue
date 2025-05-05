<script setup lang="ts">
    const props = defineProps<{
        title    : string,
        subtitle : string,
        urlLink  : string,
        urlText  : string
    }>()
</script>

<template>
    <div class="text-wrap p-4 p-lg-5 text-center d-flex align-items-center">
        <div class="text w-100">
            <h2>{{ props.title }}</h2>
            <p>{{ props.subtitle }}</p>
            <RouterLink :to="{path: props.urlLink}">
                <div class="btn btn-white btn-outline-white">{{ props.urlText }}</div>
            </RouterLink>
        </div>
    </div>
</template>

<style scoped></style>