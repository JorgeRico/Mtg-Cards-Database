<script setup lang="ts">
    import NavBar from '@components/NavBar/NavBar.vue';
    import Footer from '@components/Backoffice/Footer/Footer.vue';
    import Header from '@components/Backoffice/Header/Header.vue';
    import helpers from '@config/firebase.ts';

    function scrollBehavior() {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    
    const initialize = () => {
        helpers.watchAuthState();
        var offsetHeight = document.getElementById('app').offsetHeight;

        // top link button show hide
        window.addEventListener('scroll', () => {
            if (scrollY > offsetHeight) {
                document.getElementById('topLink').classList.remove("hide")
            } else {
                document.getElementById('topLink').classList.add("hide")
            }
        })
    };

    initialize();
    
</script>

<template>
    <div class="container-box" id="main" ref="info-box">
        <NavBar></NavBar>
        <div class="main" >
            <Header></Header>
            <div class="content">
                <slot></slot>
            </div>
            <RouterLink :to="{}" @click="scrollBehavior(1)" id="topLink" class="hide">
                <i class="fa-solid fa-circle-up"></i>
            </RouterLink>
            <Footer></Footer>
        </div>
    </div>
</template>

<style lang="css" scoped>
    .container-box {
        display: flex;
    }

    .main {
        min-height: 100vh;
        width: 100%;
        padding: 1em 3em 5em 0.75em;
        overflow: hidden;
        transition: all 0.35s ease-in-out;
        background-color: #fafbfe;
    }

    .main .content {
        margin-top: 4em;
        margin-left: 2em;
    }

    svg.fa-circle-up{
        position: fixed;
        bottom: 50px;
        z-index: 1000000;
        right: 20px;
        height: 2em;
    }
</style>