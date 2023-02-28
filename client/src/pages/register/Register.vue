<template>
    <div class="auth-wrapper d-flex align-center justify-center pa-4">
        <VCard class="auth-card pa-4 pt-7" max-width="448">
            <Title></Title>
            <VCardText>
                <VForm @submit.prevent="() => {}">
                    <VRow>
                        <!-- email -->
                        <VCol cols="12">
                            <VTextField v-model="email" label="Email" type="email"/>
                        </VCol>

                        <!-- password -->
                        <VCol cols="12">
                            <VTextField
                                v-model="password"
                                label="Password"
                                :type="isPasswordVisible ? 'text' : 'password'"
                                :append-inner-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                                @click:append-inner="isPasswordVisible = !isPasswordVisible"
                            />
                            <div class="d-flex align-center mt-1 mb-4">
                                <VCheckbox id="privacy-policy" v-model="privacyPolicies" inline/>
                                <Modal></Modal>
                            </div>

                            <VBtn block type="submit" @click="register">
                                Sign up
                            </VBtn>
                        </VCol>
                        <VCol>
                            <Error :errorMessage="errorMessage"></Error>
                            <Success :successMessage="successMessage"></Success>
                        </VCol>
                        <!-- login instead -->
                        <VCol cols="12" class="text-center text-base">
                            <span>Already have an account?</span>
                            <RouterLink class="text-primary ms-2" to="login">
                                Sign in instead
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
import Error from "@/layouts/components/errors/Error.vue";
import Success from "@/layouts/components/success/Success.vue";
import Title from "@/layouts/components/public/Title.vue";
import Background from "@/layouts/components/public/Background.vue";
import Modal from "@/layouts/components/public/Modal.vue";

export default {
    components: {
        Error,
        Success,
        Title,
        Background,
        Modal
    },
    data() {
        return {
            errorMessage   : '',
            successMessage : ''
        }
    },
    methods: {
        isRegisterParamsEmpty(email, password, privacyPolicies) {
            if (email == '' || password == '' || privacyPolicies == false) {
                this.errorMessage = 'Fill all data';
                this.show('error');

                return true;
            }

            return false;
        },
        async register() {
            this.clearErrorAndSuccess();

            if (this.isRegisterParamsEmpty(this.email, this.password, this.privacyPolicies) == false) {
                // ask to firebase
                await this.$store.dispatch('signup', {
                    email    : this.email,
                    password : this.password
                })

                // Register successful
                if (this.$store.state.successMessage != null) {
                    this.showSuccess(this.$store.state.successMessage);
                }

                // Register error
                if (this.$store.state.errorMessage != null) {
                    this.showError(this.$store.state.errorMessage);
                }
            }
        }
    },
    setup() {
        const isPasswordVisible = ref(false)
        const email             = ref('')
        const password          = ref('')
        const privacyPolicies   = ref(false)

        return {
            isPasswordVisible,
            email,
            password,
            privacyPolicies,
        }
    },
}
</script>
