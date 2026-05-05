<script setup lang="ts">
    import Row from "@components/Backoffice/Set/Table/Online/Row.vue"

    const props = defineProps<{
        items: Object[]
    }>()
</script>

<template>
    <table class="table">
        <thead class="thead-dark">
            <tr>
                <th>LOGO</th>
                <th>RELEASE DATE</th>
                <th>NAME</th>
                <th>ABREV</th>
                <th>TOTAL SET CARDS</th>
                <th>TOTAL MOL CARDS</th>
                <th>edit</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in props.items">
                <Row :key=item :item=item></Row>
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