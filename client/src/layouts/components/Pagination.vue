<template>
    <div class="relative w-100 right">
        <nav aria-label="Page navigation">
            <ul class="pagination justify-content-end">
                <li class="page-item disabled" v-if="page == 1">
                    <a class="page-link" href="#" tabindex="-1">Previous</a>
                </li>
                <li class="page-item" v-else>
                    <a class="page-link" href="#" tabindex="-1" @click="pagination(-1)">Previous</a>
                </li>
                
                <li class="page-item" v-for="num in numPages"> 
                    <a class="page-link active" href="#" @click="pagination(num)" v-if="page==num">{{ num }}</a>
                    <a class="page-link" href="#" @click="pagination(num)" v-else>{{ num }}</a>
                </li>
            
                <li class="page-item" v-if="page != numPages">
                    <a class="page-link" href="#" @click="pagination(0)">Next</a>
                </li>
                <li class="page-item disabled" v-else>
                    <a class="page-link" href="#">Next</a>
                </li>
            </ul>
        </nav>
    </div>
</template>
  
<script>

export default {
    components: {
        
    },
    data() {
        return {
            
        }
    },
    props: {
        page: {
            type: Number,
            default: 1,
        },
        numPages: {
            type: Number,
            default: 1,
        },
    },
    methods: {
        pagination(num) {
            if (num == -1) {
                num = this.page - 1;
            }
            if (num == 0) {
                num = this.page + 1;
            }
            this.$emit("clickPagination", num);
        },
    },
    created() {
        
    },
    beforeMount() {

    }
}
</script>
  