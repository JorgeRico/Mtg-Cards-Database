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
    <td :class="`${className} textCenter`">{{ props.item.setReleaseDate }}</td>
    <td :class="`${className} textCenter`">{{ props.item.setAbrv }}</td>
    <td :class="`${className} textCenter`">
        <RouterLink :to="{ name: 'setCards', params: { id: props.item.id }}">
            <span>{{ props.item.setName }}</span>
        </RouterLink>
    </td>
    <td :class="`${className} textCenter`">{{ props.item.setTotalCards }}</td>
    <td :class="`${className} textCenter`">{{ props.item.ownedCards }}</td>
    <td :class="`${className} textCenter`">{{ props.item.setTotalCards - props.item.specialCards }}</td>
    <td :class="`${className} textCenter`">{{ props.item.setTotalMolCards ?  props.item.setTotalMolCards : '-' }}</td>
    <td :class="`${className} textCenter`">{{ props.item.specialCards }}</td>
    <td :class="`${className} textCenter`">
        <RouterLink :to="{ name: 'setCards', params: { id: props.item.id }}">
            edit
        </RouterLink>
    </td>
</template> : '-' 

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
        vertical-align: middle;
    }
</style>