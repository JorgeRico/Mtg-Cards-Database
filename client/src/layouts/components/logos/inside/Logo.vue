<template>
    <div class="w-50 mt20 right">
        <div class="item-box mb40" size="ETIQUETA" style="padding-top : 0">
            <div v-for="(item, i) in setList" class="icono-box">
                <div class="iconoInside">
                    <i :class="'ss ss-3x ss-'+item.icon.toLowerCase()"></i>
                </div>
                <div class="icono-text-inside">
                    <span class="icono-text-big">{{ item.name }}</span>
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
  