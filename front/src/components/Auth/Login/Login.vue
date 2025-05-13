<script setup lang="ts">
    import AuthLayout from '@layouts/AuthLayout.vue';
    import Card from '@components/Auth/Card/Card.vue';
    import helpers from '@config/firebase.ts';
    import { TextField, PasswordField } from '@asigloo/vue-dynamic-forms';
    import { ref } from 'vue';

    const form = ref({
        id: 'login-form',
        fields: {
            email: TextField({
                label: 'Username',
                placeholder: 'Username',
            }),
            password: PasswordField({
                label: 'Password',
                placeholder: 'Password',
            }),
        },
    });

    function checkLogin() {
        var email    = document.querySelector<HTMLInputElement>('input[name="email"]')?.value;
        var password = document.querySelector<HTMLInputElement>('input[name="password"]')?.value;
            
        helpers.login(email, password);
    }
</script>

<template>
    <AuthLayout>
        <Card title="Welcome to login" subtitle="Don't have an account?" urlLink="/register" urlText="Register"></Card>
        <div class="login-wrap p-4 p-lg-5">
            <div class="d-flex">
                <div class="w100">
                    <h3 class="mb-4">Sign In</h3>
                </div>
            </div>
            <dynamic-form :form=form @submit.prevent="checkLogin" class="signin-form">
                <input :label="form.fields.email.label" class="form-control mb-3">
                <input :label="form.fields.password.label" class="form-control mb-3">
            </dynamic-form>
            <div class="form-group">
                <button type="submit" class="form-control btn-auth submit px-3 mt10" @click="checkLogin">Sign In</button>
            </div>
            <div class="form-group d-md-flex">
                <div class="w50 text-left">
                    <label class="checkbox-wrap checkbox-primary mb0">
                        <span class="ml25">Remember Me</span>
                        <input class="hide" type="checkbox" checked>
                        <span class="checkmark"></span>
                    </label>
                </div>
                <div class="w50 text-right">
                    <RouterLink to="/forgot">Forgot Password</RouterLink>
                </div>
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


/* Create a custom checkbox */
.checkmark {
    position: absolute;
    top: 0;
    left: 0; 
}
  
/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
    content: "\f0c8";
    font-family: "FontAwesome";
    position: absolute;
    color: rgba(0, 0, 0, 0.1);
    font-size: 20px;
    margin-top: -4px;
    -webkit-transition: 0.3s;
    -o-transition: 0.3s;
    transition: 0.3s; 
}

@media (prefers-reduced-motion: reduce) {
    .checkmark:after {
        -webkit-transition: none;
        -o-transition: none;
        transition: none; 
    } 
}
  
/* Show the checkmark when checked */
.checkbox-wrap input:checked ~ .checkmark:after {
    display: block;
    content: "\f14a";
    font-family: "FontAwesome";
    color: rgba(0, 0, 0, 0.2); 
}
  
/* Style the checkmark/indicator */
.checkbox-primary {
    color: #f35588; 
}

.checkbox-primary input:checked ~ .checkmark:after {
    color: #f35588; 
}
</style>
