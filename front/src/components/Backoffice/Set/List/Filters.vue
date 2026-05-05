<script setup lang="ts">
    type IEmit = {
        (event: 'customFilterChange', option: number): number
    };
    const emit = defineEmits<IEmit>();
    
    const getSetListFiltered = (option: number) => {
        emit('customFilterChange', option)
    }
</script>

<template>
    <div class="left w100 d-flex justify-content-start gap-1">
        <button type="button" class="btn btn-primary" @click="getSetListFiltered(0)">All sets</button>
        <button type="button" class="btn btn-success" @click="getSetListFiltered(1)">Complete sets</button>
        <button type="button" class="btn btn-warning" @click="getSetListFiltered(2)">Working sets</button>
        <button type="button" class="btn btn-danger" @click="getSetListFiltered(3)">Not started sets</button>
        <button type="button" class="btn btn-dark" @click="getSetListFiltered(4)">Imposible sets</button>
    </div>
</template>

<style lang="css" scoped>
    
</style>