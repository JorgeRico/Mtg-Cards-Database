<script setup lang="ts">
    import helpers from '@config/firebase.ts';

    async function checkLogout() {
        helpers.logout()
    }
</script>

<template>
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark fixed-bottom">
        <div class="container-fluid">
            <RouterLink :to="{}" 
                @click="checkLogout"
                class="sidebar-footer sidebar-link">
                    <i class="fa-solid fa-right-from-bracket"></i>
                    <span>Logout</span>
            </RouterLink>
        </div>
    </nav>
</template>

<style lang="css" scoped>
    .fixed-bottom {
        padding: 1em 0.75em;
    }
    
    .container-fluid {
        display: block;
    }

    .sidebar-footer, .sidebar-footer span {
        font-size: 1.3rem;
        cursor: pointer;
        color: #FFF;
        width: max-content;
    }
    
    .sidebar-footer span {
        padding: 0.7rem 1.5rem;
    }

    .sidebar-item svg, .sidebar-footer svg {
        color: white;
    }

    .fixed-bottom {
        z-index: 100000;
    }
</style>
