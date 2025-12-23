<script setup lang="ts">
    interface SetInfo {
        complete         : number,
        setTotalCards    : number,
        ownedCards       : number,
        setLogo          : string
        setReleaseDate   : string,
        setAbrv          : string,
        id               : number,
        setName          : string,
        specialCards     : number,
        setTotalMolCards : number
    }

    const props = defineProps<{
        item : SetInfo 
    }>()
</script>

<template>
    <td>
        <div class="logo" v-html="props.item.setLogo"></div>
    </td>
    <td>{{ props.item.setReleaseDate }}</td>
    <td>{{ props.item.setAbrv }}</td>
    <td>
        <RouterLink :to="{ name: 'setCards', params: { id: props.item.id }}">
            <span>{{ props.item.setName }}</span>
        </RouterLink>
    </td>
    <td>{{ props.item.setTotalCards }}</td>
    <td>{{ props.item.setTotalMolCards }}</td>
    <td>
        <RouterLink :to="{ name: 'setCards', params: { id: props.item.id }}">
            <span>edit</span>
        </RouterLink>
    </td>
</template>

<style lang="css" scoped>
    .logo {
        width: 25px;
        margin: 0 auto;
    }

    td:first-child {
        width: 20px;
        text-align: center;
    }

    td {
        padding: 10px;
    }
</style>