<template>
    <div class="auth-wrapper d-flex align-center justify-center pa-4">
        <VCard class="auth-card pa-4 pt-7" max-width="448">
            <Title></Title>
            <!-- login form -->
            <v-card-text>
                <v-form>
                    <h3 class="mb-3">Recuperar contraseña</h3>
                    <v-text-field v-model="email" outlined label="Email" placeholder="john@example.com" hide-details class="mb-3"></v-text-field>

                    <v-btn block color="primary" class="mb10" @click="send">
                    Enviar
                    </v-btn>
                    <Error :errorMessage="errorMessage"></Error>
                    <Success :successMessage="successMessage"></Success>
                </v-form>
            </v-card-text>
            <!-- create new account  -->
            <v-card-text class="d-flex align-center justify-center flex-wrap mt-2">
                <span class="me-2">
                    ¿Ya tienes un usuario?
                </span>
                <router-link :to="{ name: 'login' }">
                    Acceder al sistema
                </router-link>
            </v-card-text>
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
import router from "@/router";
import Error from "@/layouts/components/errors/Error.vue";
import Success from "@/layouts/components/success/Success.vue";
import Title from "@/layouts/components/public/Title.vue";
import Background from "@/layouts/components/public/Background.vue";

export default {
    components: {
        Error,
        Success,
        Title,
        Background,
    },
    data() {
        return {
            errorMessage   : '',
            successMessage : ''
        }
    },
    methods: {
        isRecoverParamsEmpty(email) {
            if (email == '') {
                this.errorMessage = 'Fill all data';
                this.show('error');

                return true;
            }

            return false;
        },
        async send() {
            this.clearErrorAndSuccess();

            if (this.isRecoverParamsEmpty(this.email) == false) {
                // ask to firebase
                await this.$store.dispatch('recover', {
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
        const email = ref('')

        return {
            email,
        }
    },
}
</script>
