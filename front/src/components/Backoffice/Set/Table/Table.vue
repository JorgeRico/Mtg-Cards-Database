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
                <th>NAME</th>
                <th>ABREV</th>
                <th>TOTAL SET CARDS</th>
                <th>TOTAL OWNED CARDS</th>
                <th>SET CARDS</th>
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
    th {
        background: black;
        color: white;
    }
</style>