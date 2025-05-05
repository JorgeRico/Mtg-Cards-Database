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
        <Card title="Welcome to forgot" subtitle="Don't have an account?" urlLink="/register" urlText="Register"></Card>
        <div class="login-wrap p-4 p-lg-5">
            <div class="d-flex">
                <div class="w-100">
                    <h3 class="mb-4">Forgot Password</h3>
                </div>
            </div>
            <form action="#" class="signin-form">
                <div class="form-group mb-3 mt20">
                    <label class="label" for="email">E-mail</label>
                    <input type="text" class="form-control mt5" placeholder="E-mail" required>
                </div>
                <div class="form-group">
                    <button type="submit" class="form-control btn btn-primary submit px-3 mt10 mb40">Recover password</button>
                </div>
            </form>
        </div>
    </AuthLayout>
</template>

<style scoped>

</style>
