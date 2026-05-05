<script setup lang="ts">
    interface SetInfo {
        numTotal         : number
    }

    const props = defineProps<{
        data : SetInfo
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
        </div>
    </div>
</template>

<style lang="css" scoped>

</style>