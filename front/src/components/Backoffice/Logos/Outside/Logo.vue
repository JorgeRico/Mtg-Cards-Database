<script setup lang="ts">
    interface Logo {
        icon  : string,
        name  : string
        month : string,
        year  : string
    }

    const props = defineProps<{
        items : Logo[]
    }>()
    console.log(props.items)
</script>

<template>
    <div class="w50 mt20 right">
        <div class="item-box mb40" size="ETIQUETA">
            <div v-for="item in props.items" class="icono-box">
                <div class="icono">
                    <i  v-if=item.icon :class="'ss ss-3x ss-'+item.icon.toLowerCase()"></i>
                </div>
                <div class="icono-text"  v-if=item.icon>
                    <span class="icono-text-big">{{ item.name }}</span>
                    <br>
                    <span class="icono-text-small">{{ item.icon.toUpperCase() }} · {{ item.month }} {{ item.year }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="css" scoped>

</style>