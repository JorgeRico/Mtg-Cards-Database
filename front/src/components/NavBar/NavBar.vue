<script setup lang="ts">

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
                <RouterLink :to="{name: 'sets'}" class="sidebar-link">
                    <i class="fa-solid fa-database"></i>
                    <span>Sets</span>
                </RouterLink>
            </li>
            <li class="sidebar-item">
                <RouterLink :to="{name: 'specialSets'}" class="sidebar-link">
                    <i class="fa-solid fa-crown"></i>
                    <span>Special Sets</span>
                </RouterLink>
            </li>
            <li class="sidebar-item">
                <RouterLink :to="{name: 'pendingCards'}" class="sidebar-link">
                    <i class="fa-solid fa-file-import"></i>
                    <span>Pending Cards</span>
                </RouterLink>
            </li>
            <li class="sidebar-item">
                <RouterLink :to="{name: 'playingCards'}" class="sidebar-link">
                    <i class="fa-solid fa-rectangle-list"></i>
                    <span>Cards on Deck</span>
                </RouterLink>
            </li>
            <li class="sidebar-item">
                <RouterLink :to="{name: 'upgradeCards'}" class="sidebar-link">
                    <i class="fa-solid fa-square-up-right"></i>
                    <span>Upgrade cards</span>
                </RouterLink>
            </li>
            <li class="sidebar-item">
                <RouterLink :to="{name: 'onlineSets'}" class="sidebar-link">
                    <i class="fa-solid fa-eye-low-vision"></i>
                    <span>Online sets</span>
                </RouterLink>
            </li>
            <li class="sidebar-item">
                <hr>
            </li>
            <li class="sidebar-item">
                <RouterLink :to="{name: 'outsideLogos'}" class="sidebar-link">
                    <i class="fa-solid fa-boxes-stacked"></i>
                    <span>Outside Logos</span>
                </RouterLink>
            </li>
            <li class="sidebar-item">
                <RouterLink :to="{name: 'insideLogos'}" class="sidebar-link">
                    <i class="fa-solid fa-book-open"></i>
                    <span>Inside Logos</span>
                </RouterLink>
            </li>
        </ul>
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

    .sidebar-item, .sidebar-item span {
        font-size: 1.3rem;
        cursor: pointer;
        color: #FFF;
        padding: 0.7rem 1.5rem;
        width: max-content;
    }

    .sidebar-item svg {
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