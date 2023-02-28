<template>
    <div class="mb20">
        <label>{{ label }}</label>
        <v-text-field 
            :id="modelName" 
            :v-model="modelName" 
            outlined 
            dense 
            :placeholder="placeholderText" 
            hide-details>
        </v-text-field>
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
        placeholderText: {
            type: String,
            default: '',
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
  