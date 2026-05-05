<script setup lang="ts">
    import Row from "@components/Backoffice/Set/Table/Row.vue"

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
                <th>CODE</th>
                <th>NAME</th>
                <th>TOTAL SET CARDS</th>
                <th>TOTAL OWNED CARDS</th>
                <th>SET CARDS</th>
                <th>MOL CARDS</th>
                <th>SPECIAL CARDS</th>
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