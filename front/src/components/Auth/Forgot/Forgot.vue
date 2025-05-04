<script setup lang="ts">

</script>

<template>
        <div class="container">
            <div class="row justify-content-center mt-15">
                <div class="col-md-12 col-lg-10">
                    <div class="wrap d-md-flex">
                        <div class="text-wrap p-4 p-lg-5 text-center d-flex align-items-center">
                            <div class="text w-100">
                                <h2>Welcome to Forgot</h2>
                                <p>Don't have an account?</p>
                                <RouterLink to="/">
                                    <div class="btn btn-white btn-outline-white">Register</div>
                                </RouterLink>  
                            </div>
                        </div>
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
                    </div>
                </div>
            </div>
        </div>
</template>

<style scoped>

</style>
