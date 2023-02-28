<template>
    <div class="auth-wrapper d-flex align-center justify-center pa-4">
        <VCard class="auth-card pa-4 pt-7" max-width="448">
            <Title></Title>
            <VCardText>
                <VForm @submit.prevent="() => {}">
                    <VRow>
                        <!-- email -->
                        <VCol cols="12">
                            <VTextField v-model="email" label="Email" type="email" placeholder="admin@admin.com"/>
                        </VCol>
                        <!-- password -->
                        <VCol cols="12">
                            <VTextField
                                v-model="password"
                                placeholder="123456"
                                label="Password"
                                :type="isPasswordVisible ? 'text' : 'password'"
                                :append-inner-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                                @click:append-inner="isPasswordVisible = !isPasswordVisible"
                            />
                            <!-- remember me checkbox -->
                            <div class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4">
                                <VCheckbox v-model="remember" label="Remember me"/>
                                <RouterLink class="text-primary ms-2" :to="{ name: 'recover' }">
                                    Forgot Password?
                                </RouterLink>
                            </div>
                            <!-- login button -->
                            <VBtn block type="submit" @click="handleSubmit">
                                Login
                            </VBtn>
                        </VCol>
                        <VCol>
                            <Error :errorMessage="errorMessage"></Error>
                        </VCol>
                        <!-- create account -->
                        <VCol cols="12" class="text-center text-base">
                            <span>New on our platform?</span>
                            <RouterLink class="text-primary ms-2" :to="{ name: 'register' }">
                                Create an account
                            </RouterLink>
                        </VCol>
                    </VRow>
                </VForm>
            </VCardText>
        </VCard>
        <Background></Background>
    </div>
</template>

<style lang="scss">
@use "@core/scss/pages/page-auth.scss";
</style>

<route lang="yaml">
meta:
  layout: blank
</route>

<script>
import { useTheme } from 'vuetify';
import { useStore } from 'vuex'
import router from "@/router";
import Title from "@/layouts/components/public/Title.vue";
import Error from "@/layouts/components/errors/Error.vue";
import Background from "@/layouts/components/public/Background.vue";

export default {
    components: {
        Error,
        Title,
        Background
    },
    data() {
        return {
            errorMessage : '',
        }
    },
    methods: {
        isLoginParamsEmpty(email, password) {
            if (email == '' || password == '') {
                this.errorMessage = 'Fill all data';
                this.show('error');

                return true;
            }

            return false;
        },
        async handleSubmit() {
            this.clearError();

            if (this.isLoginParamsEmpty(this.email, this.password) == false) {
                // ask to firebase
                await this.$store.dispatch('login', {
                    email    : this.email,
                    password : this.password
                })

                // Login successful
                if (this.$store.state.user != null) {
                    this.$router.push('dashboard');
                }

                // Login error
                if (this.$store.state.errorMessage != null) {
                    this.showError(this.$store.state.errorMessage);
                }
            }
        }
    },
    setup() {
        const vuetifyTheme      = useTheme()
        const isPasswordVisible = ref(false)
        const email             = ref('')
        const password          = ref('')
        const remember          = ref(false)

        return {
            isPasswordVisible,
            email,
            password,
            remember,
        }
    },
    beforeMount() {
        this.redirectIfIsLogged();
    }
}

</script>