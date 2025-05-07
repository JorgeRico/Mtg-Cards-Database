<script setup lang="ts">
    import AuthLayout from '@layouts/AuthLayout.vue';
    import Card from '@components/Auth/Card/Card.vue';

    defineExpose({
        AuthLayout,
        Card
    });

</script>

<template>
    <AuthLayout>
        <Card title="Welcome to login" subtitle="Don't have an account?" urlLink="/register" urlText="Register"></Card>
        <div class="login-wrap p-4 p-lg-5">
            <div class="d-flex">
                <div class="w-100">
                    <h3 class="mb-4">Sign In</h3>
                </div>
            </div>
            <form action="#" class="signin-form">
                <div class="form-group mb-3">
                    <label class="label" for="name">Username</label>
                    <input type="text" class="form-control mt5" placeholder="Username" required>
                </div>
                <div class="form-group mb-3">
                    <label class="label" for="password">Password</label>
                    <input type="password" class="form-control mt5" placeholder="Password" required>
                </div>
                <div class="form-group">
                    <button type="submit" class="form-control btn-auth submit px-3 mt10">Sign In</button>
                </div>
                <div class="form-group d-md-flex">
                    <div class="w-50 text-left">
                        <label class="checkbox-wrap checkbox-primary mb-0">Remember Me
                            <input type="checkbox" checked>
                            <span class="checkmark"></span>
                        </label>
                    </div>
                    <div class="w-50 text-right">
                        <RouterLink to="/forgot">Forgot Password</RouterLink>
                    </div>
                </div>
            </form>
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
