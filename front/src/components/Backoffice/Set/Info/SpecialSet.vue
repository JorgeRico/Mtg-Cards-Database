<script setup lang="ts">
    interface SetInfo {
        numTotal         : number,
        numTotalComplete : number
    }

    const props = defineProps<{
        data : SetInfo
    }>()
</script>

<template>
    <div class="info">
        <div>
            <strong>Total Sets: </strong>{{ props.data.numTotal }}
        </div>
        <div>
            <strong>Total Complete Sets: </strong>{{ props.data.numTotalComplete }}
        </div>
    </div>
</template>

<style lang="css" scoped>
    .info {
        float: left;
        width: 50%;
    }
</style>