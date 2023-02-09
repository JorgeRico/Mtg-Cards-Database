<template>
    <div class="mb-20">
        <label>{{ label }}</label>
        <select :id="modelName" :v-model="modelName" outlined dense :label="modelName">
            <option value="">-</option>
            <option v-for="(item, i) in items" :value="item">{{ item }}</option>
        </select>
    </div>
</template>

<script>
export default {
    components: {

    },
    data () {
        return {
            
        }
    },
    props: {
        label: {
            type: String,
            default: '',
        },
        modelName: {
            type: String,
            default: '',
        },
        items: {
            type: Array,
            default: [],
        },
    },
    methods: {
    
    },
    mounted() {
    
    },
    beforeMount() {

    }
}
</script>
  