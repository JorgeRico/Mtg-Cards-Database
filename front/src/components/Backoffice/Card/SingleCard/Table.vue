<script setup lang="ts">
    import Row from "@components/Backoffice/Card/SingleCard/Row.vue"

    const props = defineProps<{
        items         : Object[],
        isPendingCard : boolean
    }>()
</script>

<template>
    <table class="table">
        <thead class="thead-dark">
            <tr>
                <th>NUM</th>
                <th>IMG</th>
                <th>NAME</th>
                <th>SETNAME</th>
                <th>STATUS</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in props.items">
                <Row :key=item :item=item :index=index :isPendingCard=props.isPendingCard></Row>
            </tr>
        </tbody>
    </table>
</template>

<style lang="css" scoped>
    
</style>