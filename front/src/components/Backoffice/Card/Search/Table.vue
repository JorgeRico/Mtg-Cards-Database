<script setup lang="ts">
    import Row from "@components/Backoffice/Card/Search/Row.vue"

    const props = defineProps<{
        items: Object[]
    }>()
</script>

<template>
    <table class="table">
        <thead class="thead-dark">
            <tr>
                <th>IMG</th>
                <th>NAME</th>
                <th>SETNAME</th>
                <th>STATUS</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in props.items">
                <Row :key=item :item=item :index=index></Row>
            </tr>
        </tbody>
    </table>
</template>

<style lang="css" scoped>
    table {
        border-collapse: separate;
        border-spacing: revert;
    }

    thead tr {
        text-align: center;
    }
    
    th {
        background: rgba(12, 79, 235, 0.1);
        color: darkslategrey;
    }
</style>