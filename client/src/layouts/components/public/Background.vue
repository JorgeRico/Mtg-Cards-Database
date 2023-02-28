<template>
    <VImg
      class="auth-footer-start-tree d-none d-md-block"
      :src="authV1Tree"
      :width="250"
    />

    <VImg
      :src="authV1Tree2"
      class="auth-footer-end-tree d-none d-md-block"
      :width="350"
    />
</template>

<script>
import authV1Tree2 from '@/assets/images/pages/auth-v1-tree-2.png';
import authV1Tree from '@/assets/images/pages/auth-v1-tree.png';

export default {
    components: {

    },
    data() {
        return {
            authV1Tree2  : authV1Tree2,
            authV1Tree   : authV1Tree,
        }
    },
    methods: {
    
    },
    setup() {
        return {

        }
    },
}
</script>