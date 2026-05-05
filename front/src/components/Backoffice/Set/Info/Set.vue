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
    <div class="left info d-flex justify-content-start gap-5 mt20 mb30">
        <div class="bubble">
            <span class="left head w100">
                <strong>Sets</strong>
            </span>
            <span class="left w100">
                <span class="left">Total:</span>
                <span class="right">{{ props.data.numTotal }}</span>
            </span>
            <span class="left w100">
                <span class="left">Complete:</span>
                <span class="right">{{ props.data.numTotalComplete }}</span>
            </span>
        </div>
        <div class="bubble">
            <span class="head">
                <strong>Cards</strong>
            </span>
            <span class="left w100">
                <span class="left">Total:</span>
                <span class="right">{{ props.data.numTotalCards }}</span>
            </span>
            <span class="left w100">
                <span class="left">Pending:</span>
                <span class="right">{{ props.data.numTotalPendingCards }}</span>
            </span>
            <span class="left w100">
                <span class="left">Own:</span>
                <span class="right">{{ props.data.numTotalCardsOwn }}</span>
            </span>
        </div>
    </div>
</template>

<style lang="css" scoped>
    
</style>