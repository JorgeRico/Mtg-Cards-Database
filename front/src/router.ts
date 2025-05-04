import { createWebHashHistory, createRouter } from 'vue-router'

import LoginView from './components/Auth/Login/Login.vue'
import RegisterView from './components/Auth/Register/Register.vue'
import ForgotView from './components/Auth/Forgot/Forgot.vue'
import NotFoundComponent from './components/NotFoundComponent/NotFound.vue'

const routes = [
    { path: '/', component: LoginView },
    { path: '/register', component: RegisterView },
    { path: '/forgot', component: ForgotView },
    { 
        path: '/:catchAll(.*)', 
        component: NotFoundComponent,
        name: 'NotFound'
      }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router