<script setup lang="ts">
    import NavBar from '@components/NavBar/NavBar.vue';
    import Footer from '@components/Backoffice/Footer/Footer.vue';
    import Header from '@components/Backoffice/Header/Header.vue';
    import helpers from '@config/firebase.ts';
    
    const initialize = () => {
        helpers.watchAuthState()
    };

    initialize();
</script>

<template>
    <div class="container-box">
        <NavBar></NavBar>
        <div class="main">
            <Header></Header>
            <div class="content">
                <slot></slot>
            </div>
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
</style>