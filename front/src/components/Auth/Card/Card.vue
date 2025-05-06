<script setup lang="ts">
    const props = defineProps<{
        title    : string,
        subtitle : string,
        urlLink  : string,
        urlText  : string
    }>()
</script>

<template>
    <div class="text-wrap p-4 p-lg-5 text-center d-flex align-items-center">
        <div class="text w-100">
            <h2>{{ props.title }}</h2>
            <p>{{ props.subtitle }}</p>
            <RouterLink :to="{path: props.urlLink}">
                <div class="btn btn-white btn-outline-white">{{ props.urlText }}</div>
            </RouterLink>
        </div>
    </div>
</template>

<style scoped>
    .text-wrap {
        white-space: normal !important; 
    }

    .text-wrap {
        width: 50%; 
    }

    @media (max-width: 991.98px) {
        .text-wrap {
            width: 100%; 
        } 
    }
    
    .text-wrap {
        background: #f75959;
        background: -moz-linear-gradient(-45deg, #f75959 0%, #f35587 100%);
        background: -webkit-gradient(left top, right bottom, color-stop(0%, #f75959), color-stop(100%, #f35587));
        background: -webkit-linear-gradient(-45deg, #f75959 0%, #f35587 100%);
        background: -o-linear-gradient(-45deg, #f75959 0%, #f35587 100%);
        background: -ms-linear-gradient(-45deg, #f75959 0%, #f35587 100%);
        background: -webkit-linear-gradient(315deg, #f75959 0%, #f35587 100%);
        background: -o-linear-gradient(315deg, #f75959 0%, #f35587 100%);
        background: linear-gradient(135deg, #f75959 0%, #f35587 100%);
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f75959', endColorstr='#f35587', GradientType=1 );
        color: #fff; 
    }

    .text-wrap .text h2 {
        font-weight: 900;
        color: #fff; 
    }
</style>