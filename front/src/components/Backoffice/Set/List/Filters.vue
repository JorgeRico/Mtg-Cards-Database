<script setup lang="ts">
    type IEmit = {
        (event: 'customFilterChange', option: Number): Number
    };
    const emit = defineEmits<IEmit>();
    
    const getSetListFiltered = (option: Number) => {
        emit('customFilterChange', option)
    }
</script>

<template>
    <div class="right d-flex mb10 w-100 justify-content-end">
        <button type="button" class="btn btn-primary" @click="getSetListFiltered(0)">All sets</button>
        <button type="button" class="btn btn-success" @click="getSetListFiltered(1)">Complete sets</button>
        <button type="button" class="btn btn-warning" @click="getSetListFiltered(2)">Working sets</button>
        <button type="button" class="btn btn-danger" @click="getSetListFiltered(3)">Not started sets</button>
        <button type="button" class="btn btn-dark" @click="getSetListFiltered(4)">Imposible sets</button>
    </div>
</template>

<style lang="css" scoped>
    button {
        margin-left: 5px;
    }
</style>