<script setup lang="ts">
    import helpers from '@config/firebase.ts';

    async function checkLogout() {
        helpers.logout()
    }

</script>

<template>
    <aside id="sidebar">
        <input type="checkbox" checked name="" id="toggler">
        <label for="toggler" class="toggle-btn">
            <!-- Icon For Sidebar Toggle -->
            <i class="fa-solid fa-bars-staggered"></i>
        </label>
        <ul class="sidebar-nav">
            <!-- Sidebar Navigation Link -->
            <li class="sidebar-item">
                <RouterLink to="/backoffice/sets" class="sidebar-link">
                    <i class="fa-solid fa-toolbox"></i>
                    <span>Sets</span>
                </RouterLink>
            </li>
            <li class="sidebar-item">
                <RouterLink to="/backoffice/special/sets" class="sidebar-link">
                    <i class="fa-solid fa-screwdriver-wrench"></i>
                    <span>Special Sets</span>
                </RouterLink>
            </li>
            <li class="sidebar-item">
                <RouterLink to="/backoffice/pending/cards" class="sidebar-link">
                    <i class="fa-solid fa-screwdriver"></i>
                    <span>Pending Cards</span>
                </RouterLink>
            </li>
            <li class="sidebar-item">
                <RouterLink to="/backoffice/playing/cards" class="sidebar-link">
                    <i class="fa-solid fa-screwdriver"></i>
                    <span>Cards on Deck</span>
                </RouterLink>
            </li>
            <li class="sidebar-item">
                <hr>
            </li>
            <li class="sidebar-item">
                <RouterLink to="/backoffice/outside/logos" class="sidebar-link">
                    <i class="fa-solid fa-film"></i>
                    <span>Outside Logos</span>
                </RouterLink>
            </li>
            <li class="sidebar-item">
                <RouterLink to="/backoffice/inside/logos" class="sidebar-link">
                    <i class="fa-solid fa-images"></i>
                    <span>Inside Logos</span>
                </RouterLink>
            </li>
        </ul>
        <div class="sidebar-footer">
            <RouterLink :to="{}" @click="checkLogout" class="sidebar-link">
                <i class="fa-solid fa-right-from-bracket"></i>
                <span>Logout</span>
            </RouterLink>
        </div>
    </aside>
</template>

<style scoped>
    ul {
        padding: 0;
    }

    #sidebar {
        display: flex;
        flex-direction: column;
        background-color: #0e2238;
        z-index: 10000;
    }

    #toggler {
        display: none;
    }

    .toggle-btn {
        font-size: 1.5rem;
        cursor: pointer;
        color: #FFF;
        padding: 1rem 1.5rem;
        width: max-content;
    }

    .sidebar-footer {
        position: absolute;
        bottom: 10px;
    }

    .sidebar-item, .sidebar-item span, .sidebar-footer, .sidebar-footer span {
        font-size: 1.3rem;
        cursor: pointer;
        color: #FFF;
        padding: 0.7rem 1.5rem;
        width: max-content;
    }

    .sidebar-item svg, .sidebar-footer svg {
        color: white;
    }

    #sidebar input[type="checkbox"]:checked~.sidebar-nav {
        width: 260px;
        min-width: 260px;
    }


    #sidebar input[type="checkbox"]:not(:checked)~* .sidebar-link span {
        display: none;
    }
</style>