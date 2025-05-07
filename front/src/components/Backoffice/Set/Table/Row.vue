<script setup lang="ts">
    interface SetInfo {
        complete       : number,
        setTotalCards  : number,
        ownedCards     : number,
        setLogo        : string
        setReleaseDate : string,
        setAbrv        : string,
        id             : number,
        setName        : string,
        specialCards   : number
    }

    const props = defineProps<{
        item : SetInfo 
    }>()
    
    var className = '';

    if (props.item.complete == 1 && props.item.setTotalCards == props.item.ownedCards) {
        className = 'complete';
    }

    if (props.item.complete == 1 && props.item.setTotalCards != props.item.ownedCards) {
        className = 'softcomplete';
    }

    if (props.item.complete != 1 && props.item.ownedCards > 0) { 
        className = 'working';
    }
</script>

<template>
    <td :class=className>
        <div class="logo" v-html="props.item.setLogo"></div>
    </td>
    <td :class=className>{{ props.item.setReleaseDate }}</td>
    <td :class=className>{{ props.item.setAbrv }}</td>
    <td :class=className>
        <RouterLink :to="{ name: 'setCards', params: { id: props.item.id }}">
            <span>{{ props.item.setName }}</span>
        </RouterLink>
    </td>
    <td :class=className>{{ props.item.setTotalCards }}</td>
    <td :class=className>{{ props.item.ownedCards }}</td>
    <td :class=className>{{ props.item.setTotalCards - props.item.specialCards }}</td>
    <td :class=className>{{ props.item.specialCards }}</td>
    <td :class=className>
        <RouterLink :to="{ name: 'setCards', params: { id: props.item.id }}">
            <span>edit</span>
        </RouterLink>
    </td>
</template>

<style lang="css" scoped>
    .logo {
        width: 25px;
    }
</style>