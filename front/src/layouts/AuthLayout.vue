<script setup lang="ts"></script>

<template>
        <div class="container">
            <div class="row justify-content-center mt-15">
                <div class="col-md-12 col-lg-10">
                    <div class="wrap d-md-flex">
                        <slot></slot>
                    </div>
                </div>
            </div>
        </div>
</template>

<style scoped>
    .container {
        width: 100%;
        padding-right: 15px;
        padding-left: 15px;
        margin-right: auto;
        margin-left: auto; 
    }

    @media (min-width: 576px) {
        .container {
            max-width: 540px; 
        } 
    }

    @media (min-width: 768px) {
        .container {
            max-width: 720px; 
        } 
    }

    @media (min-width: 992px) {
        .container {
            max-width: 960px; 
        } 
    }

    @media (min-width: 1200px) {
        .container {
            max-width: 1140px; 
        }
    }

    .wrap {
        width: 100%;
        border-radius: 5px;
        -webkit-box-shadow: -5px 15px 30px 10px rgba(0, 0, 0, 0.24);
        -moz-box-shadow: -5px 15px 30px 10px rgba(0, 0, 0, 0.24);
        box-shadow: -5px 15px 30px 10px rgba(0, 0, 0, 0.24); 
    }

    .row {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
    }
</style>