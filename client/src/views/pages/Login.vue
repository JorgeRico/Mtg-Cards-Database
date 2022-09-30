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
            <v-text-field v-model="email" outlined label="Email" placeholder="john@example.com" hide-details
              class="mb-3"></v-text-field>

            <v-text-field v-model="password" outlined :type="isPasswordVisible ? 'text' : 'password'" label="Password"
              placeholder="············" :append-icon="isPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
              hide-details @click:append="isPasswordVisible = !isPasswordVisible"></v-text-field>

            <div class="d-flex align-center justify-space-between flex-wrap mb-5 mt-3" style="float: right">
              <!-- <v-checkbox v-model="checkbox" label="Remember Me" hide-details class="me-3 mt-1">
              </v-checkbox> -->

              <!-- forgot link -->
              <router-link :to="{ name: 'recover' }" class="mt-1">
                Recuperar contraseña
              </router-link>
            </div>

            <v-btn block color="primary" class="mt-6" @click="login">
              Acceder
            </v-btn>

            <LoginError :errorMessage="errorMessage"></LoginError>


          </v-form>
        </v-card-text>

        <!-- create new account  -->
        <v-card-text class="d-flex align-center justify-center flex-wrap mt-2">
          <span class="me-2">
            ¿ Eres nuevo ?
          </span>
          <router-link :to="{ name: 'pages-register' }">
            Crea una cuenta de usuario
          </router-link>
        </v-card-text>
      </v-card>
    </div>

    <!-- background triangle shape  -->
    <img class="auth-mask-bg" height="173"
      :src="require(`@/assets/images/misc/mask-${$vuetify.theme.dark ? 'dark' : 'light'}.png`)">

    <!-- tree -->
    <v-img class="auth-tree" width="247" height="185" src="@/assets/images/misc/tree.png"></v-img>

    <!-- tree  -->
    <v-img class="auth-tree-3" width="377" height="289" src="@/assets/images/misc/tree-3.png"></v-img>
  </div>
</template>

<script>
import LoginError from '@/layouts/components/login/errors/LoginError.vue'
import { mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js'
import { ref } from '@vue/composition-api'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

export default {
  components: {
    LoginError,
  },
  data() {
    return {
      errorMessage: '',
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
    login() {
      this.hide('loginError');
      this.errorMessage = '';

      if (this.email == '' || this.password == '') {
        this.errorMessage = 'Rellena todos los campos';
        this.show('loginError');

        return;
      }
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          this.$router.push('dashboard');

          return;
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/invalid-email':
              this.errorMessage = 'E-mail incorrecto';
              break
            case 'auth/user-not-found':
              this.errorMessage = 'Usuario incorrecto';
              break
            case 'auth/wrong-password':
              this.errorMessage = 'Contraseña incorrecta';
              break
            default:
              this.errorMessage = 'Error de sistema';
              break
          }

          if (this.errorMessage != '') {
            this.show('loginError');
          }

          return;
        });
    }
  },
  setup() {
    const isPasswordVisible = ref(false)
    const email = ref('')
    const password = ref('')
    const router = ref()

    return {
      isPasswordVisible,
      email,
      password,
      router,
      icons: {
        mdiEyeOutline,
        mdiEyeOffOutline,
      },
    }
  },
  beforeMount() {
    auth.onAuthStateChanged(function (user) {
      if (user) { // not logged in
        window.location.href = "/dashboard";
      }
    })
  }
}
</script>

<style lang="scss">
@import '~@/plugins/vuetify/default-preset/preset/pages/auth.scss';
</style>
