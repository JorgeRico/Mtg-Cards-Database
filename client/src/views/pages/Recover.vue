<template>
  <div class="auth-wrapper auth-v1">
    <div class="auth-inner">
      <v-card class="auth-card">
        <!-- logo -->
        <v-card-title class="d-flex align-center justify-center py-7">
          <router-link to="/" class="d-flex align-center">
            <h2 class="text-2xl font-weight-semibold">
              MTG
            </h2>
          </router-link>
        </v-card-title>

        <!-- login form -->
        <v-card-text>
          <v-form>
            <h3 class="mb-3">Recuperar contraseña</h3>
            <v-text-field v-model="email" outlined label="Email" placeholder="john@example.com" hide-details
              class="mb-3"></v-text-field>

            <v-btn block color="primary" class="mt-6" @click="send">
              Enviar
            </v-btn>
            <RecoveryPasswordError :errorMessage="errorMessage"></RecoveryPasswordError>
            <Valid :errorMessage="errorMessage"></Valid>
          </v-form>
        </v-card-text>

        <!-- create new account  -->
        <v-card-text class="d-flex align-center justify-center flex-wrap mt-2">
          <span class="me-2">
            ¿Ya tienes un usuario?
          </span>
          <router-link :to="{ name: 'pages-login' }">
            Acceder al sistema
          </router-link>
        </v-card-text>
      </v-card>
    </div>

    <!-- background triangle shape  -->
    <img class="auth-mask-bg" height="190"
      :src="require(`@/assets/images/misc/mask-${$vuetify.theme.dark ? 'dark' : 'light'}.png`)">

    <!-- tree -->
    <v-img class="auth-tree" width="247" height="185" src="@/assets/images/misc/tree.png"></v-img>

    <!-- tree  -->
    <v-img class="auth-tree-3" width="377" height="289" src="@/assets/images/misc/tree-3.png"></v-img>
  </div>
</template>

<script>
import RecoveryPasswordError from '@/layouts/components/recovery/errors/RecoveryPasswordError.vue'
import Valid from '@/layouts/components/recovery/valid/Valid.vue'
import { mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js'
import { ref } from '@vue/composition-api'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";


export default {
  components: {
    RecoveryPasswordError,
    Valid
  },
  data() {
    return {
      errorMessage: '',
    }
  },
  setup() {
    const email = ref('')

    return {
      email,
      icons: {
        mdiEyeOutline,
        mdiEyeOffOutline,
      },
    }
  },
  methods: {
    show(id) {
      var element = document.getElementById(id);
      element.classList.remove("invisible");
      element.classList.add("visible");
    },
    hide(id) {
      var element = document.getElementById(id);
      element.classList.remove("visible");
      element.classList.add("invisible");
    },
    send() {

      this.hide('recoverPasswordError');
      this.hide('validRecovery');
      this.errorMessage = '';

      if (this.email == '') {
        this.errorMessage = 'Rellena todos los campos';
        this.show('recoverPasswordError');
        return;
      }

      sendPasswordResetEmail(getAuth(), this.email)
        .then(() => {
          this.errorMessage = 'Recibirás un email con las instrucciones para cambiar tu contraseña';
          this.show('validRecovery');
          return;
        })
        .catch((error) => {
          this.errorMessage = 'Email incorrecto';
          this.show('recoverPasswordError');
          return;
        });
    }
  }

}
</script>

<style lang="scss">
@import '~@/plugins/vuetify/default-preset/preset/pages/auth.scss';
</style>
