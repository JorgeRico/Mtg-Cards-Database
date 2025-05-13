<script setup lang="ts">
    interface Logo {
        icon : string,
        name : string
    }

    const props = defineProps<{
        item : Logo
    }>()
</script>

<template>
    <div class="w50 mt20 right">
        <div class="item-box mb40" size="ETIQUETA">
            <div  class="icono-box">
                <div class="iconoInside">
                    <i v-if=props.item.icon :class="'ss ss-3x ss-' + props.item.icon.toLowerCase()"></i>
                </div>
                <div class="icono-text-inside">
                    <span class="icono-text-big">{{ props.item.name }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="css" scoped>
    
</style>