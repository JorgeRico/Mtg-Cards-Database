<script setup lang="ts">
    interface Logo {
        icon  : string,
        logo  : string
        month : string,
        year  : string
    }

    const props = defineProps<{
        setList : Logo[]
    }>()
</script>

<template>
    <div class="w-50 mt20 right">
        <div class="item-box mb40" size="ETIQUETA">
            <div v-for="item in props.setList" class="icono-box">
                <div class="icono">
                    <i :class="'ss ss-3x ss-'+item.icon.toLowerCase()"></i>
                </div>
                <div class="icono-text">
                    <span class="icono-text-big">{{ item.logo }}</span>
                    <br>
                    <span class="icono-text-small">{{ item.icon.toUpperCase() }} · {{ item.month }} {{ item.year }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="css" scoped>

</style>