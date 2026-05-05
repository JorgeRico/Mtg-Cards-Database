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
    <td :class=className>
        <span>{{ props.item.setReleaseDate }}</span>
    </td>
    <td :class=className>
        <span>{{ props.item.setAbrv }}</span>
    </td>
    <td :class=className>
        <span>
            <RouterLink :to="{ name: 'setCards', params: { id: props.item.id }}">
                <span>{{ props.item.setName }}</span>
            </RouterLink>
        </span>
    </td>
    <td :class=className>
        <span>{{ props.item.setTotalCards }}</span>
    </td>
    <td :class=className>
        <span>{{ props.item.setTotalMolCards }}</span>
    </td>
    <td :class=className>
        <span>
            <RouterLink :to="{ name: 'setCards', params: { id: props.item.id }}">
                edit
            </RouterLink>
        </span>
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
        background: lightgray;
        padding: 20px 0 10px 0;
        text-align: center;
    }
</style>