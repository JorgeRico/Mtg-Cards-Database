<template>
    <div class="w-50 mt20 right">
        <div class="item-box mb40" size="ETIQUETA">
            <div v-for="(item, i) in setList" class="icono-box">
                <div class="icono">
                    <i :class="'ss ss-3x ss-'+item.icon.toLowerCase()"></i>
                </div>
                <div class="icono-text">
                    <span class="icono-text-big">{{ item.logo }}</span>
                    <br>
                    <span class="icono-text-small">{{ item.icon.toUpperCase() }} · {{ item.month }} {{ item.year }}</span>
                </div>
            </div>
        </div>
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
        setList: {
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
  