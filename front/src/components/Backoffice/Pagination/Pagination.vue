<script setup lang="ts">
    const props = defineProps<{
        page  : number,
        total : number
    }>()
</script>

<template>
    <div class="left mt10 w-100">
        <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-end">
                <li class="page-item disabled">
                    <a class="page-link" href="#" tabindex="-1">Previous</a>
                </li>
                <li class="page-item" v-for="index in props.total" :key="index">
                    <a v-if="props.page==index" class="active page-link" href="#">{{ index }}</a>
                    <a v-else class="page-link" href="#">{{ index }}</a>
                </li>
                <li class="page-item">
                    <a class="page-link" href="#">Next</a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<style lang="css" scoped>
    
</style>