<template>
  <div class="auth-wrapper auth-v1">
    <div class="auth-inner">
      <v-card class="auth-card">
        <!-- logo -->
        <v-card-title class="d-flex align-center justify-center py-7">
          <router-link to="/" class="d-flex align-center">
            <h2 class="text-2xl font-weight-semibold">
              Virtual Doctor and Medicines
            </h2>
          </router-link>
        </v-card-title>

        <!-- login form -->
        <v-card-text>
          <v-form>
            <h3 class="mb-3">Registro</h3>
            <v-text-field v-model="email" outlined label="Email" placeholder="john@example.com" hide-details
              class="mb-3"></v-text-field>

            <v-text-field v-model="password" outlined :type="isPasswordVisible ? 'text' : 'password'" label="Contraseña"
              placeholder="············" :append-icon="isPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
              hide-details @click:append="isPasswordVisible = !isPasswordVisible"></v-text-field>

            <v-btn block color="primary" class="mt-6" @click="register">
              Registrar
            </v-btn>
            <RegisterError :errorMessage="errorMessage"></RegisterError>
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
import RegisterError from '@/layouts/components/register/errors/RegisterError.vue'
import Valid from '@/layouts/components/register/valid/Valid.vue'
import { mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js'
import { ref } from '@vue/composition-api'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default {
  components: {
    RegisterError,
    Valid
  },
  data() {
    return {
      errorMessage: '',
    }
  },
  setup() {
    const isPasswordVisible = ref(false)
    const username = ref('')
    const email = ref('')
    const password = ref('')

    return {
      isPasswordVisible,
      username,
      email,
      password,
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
    register() {

      this.hide('registerError');
      this.hide('validRegister');
      this.errorMessage = '';

      if (this.email == '' || this.password == '') {
        this.errorMessage = 'Rellena todos los campos';
        this.show('registerError');
        return;
      }

      createUserWithEmailAndPassword(getAuth(), this.email, this.password)
        .then((userCredential) => {
          this.errorMessage = 'Usuario creado correctamente';
          this.show('validRegister');
          return;
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/invalid-email':
              this.errorMessage = 'Email incorrecto'
              break
            case 'auth/email-already-in-use':
              this.errorMessage = 'Usuario ya existe';
              break
            default:
              this.errorMessage = 'Error de sistema';
              break
          }

          if (this.errorMessage != '') {
            this.show('registerError');
          }
        });
    }
  }

}
</script>

<style lang="scss">
@import '~@/plugins/vuetify/default-preset/preset/pages/auth.scss';
</style>
