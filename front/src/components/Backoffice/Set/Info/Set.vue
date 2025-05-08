<script setup lang="ts">
    interface SetInfo {
        numTotal             : number,
        numTotalComplete     : number,
        numTotalCards        : number,
        numTotalPendingCards : number,
        numTotalCardsOwn     : number
    }

    const props = defineProps<{
        hasFilters : Boolean,
        data       : SetInfo
    }>()
</script>

<template>
    <div class="info">
        <div>
            <strong>Total Sets: </strong>{{ props.data.numTotal }}
        </div>
        <div v-if="hasFilters == false">
            <strong>Total Complete Sets: </strong>{{ props.data.numTotalComplete }}
        </div>
        <br>
        <div>
            <strong>Total Cards: </strong>{{ props.data.numTotalCards }}
        </div>
        <div>
            <strong>Total Pending Cards: </strong>{{ props.data.numTotalPendingCards }}
        </div>
        <div>
            <strong>Total Cards Own: </strong>{{ props.data.numTotalCardsOwn }}
        </div>
    </div>
</template>

<style lang="css" scoped>
    .info {
        float: left;
        width: 50%;
    }
</style>