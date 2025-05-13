<script setup lang="ts">
    import AuthLayout from '@layouts/AuthLayout.vue';
    import Card from '@components/Auth/Card/Card.vue';
    import helpers from '@config/firebase.ts';
    import { TextField } from '@asigloo/vue-dynamic-forms';
    import { ref } from 'vue';

    const form = ref({
        id: 'forgot-form',
        fields: {
            email: TextField({
                label: 'Username',
                placeholder: 'Username',
            })
        },
    });

    const hide = ref<Boolean>(false);

    async function handleForgot() {
        var email  = document.querySelector<HTMLInputElement>('input[name="email"]')?.value;
        hide.value = true;
        await helpers.recover(email);
        setTimeout(() => { hide.value = false; }, 2000);
    }
</script>

<template>
    <AuthLayout>
        <Card title="Welcome to forgot" subtitle="Don't have an account?" urlLink="/register" urlText="Register"></Card>
        <div class="login-wrap p-4 p-lg-5">
            <div class="d-flex">
                <div class="w100">
                    <h3 class="mb-4">Forgot Password</h3>
                </div>
            </div>
            <dynamic-form :form=form @submit.prevent="handleForgot" class="signin-form">
                <input :label="form.fields.email.label" class="form-control mb-3">
            </dynamic-form>
            <div class="form-group" v-if="hide==false">
                <button type="submit" class="form-control btn-auth submit px-3 mt10 mb40" @click="handleForgot">Recover password</button>
            </div>
            <div class="form-group" v-else>
                <button type="submit" disabled class="form-control submit px-3 mt10 mb40">Recover password</button>
            </div>
        </div>
    </AuthLayout>
</template>

<style scoped>

.btn-auth {
    background: #f35588;
    border: 1px solid #f35588;
    color: #fff;
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
}

.btn-auth:hover {
    border: 1px solid #f35588;
    background: #f35588;
    color: #fff; 
}
 
.btn-auth.btn-outline-primary {
    border: 1px solid #f35588;
    background: transparent;
    color: #f35588; 
}

.btn-auth.btn-outline-primary:hover {
    border: 1px solid transparent;
    background: #f35588;
    color: #fff; 
}
</style>
