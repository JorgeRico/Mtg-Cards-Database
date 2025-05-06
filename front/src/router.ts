import { createWebHashHistory, createRouter } from 'vue-router'
// auth views
import LoginView from './components/Auth/Login/Login.vue'
import RegisterView from './components/Auth/Register/Register.vue'
import ForgotView from './components/Auth/Forgot/Forgot.vue'
// not found view
import NotFoundView from './components/NotFound/NotFound.vue'
// backoffice views
import SetView from './components/Backoffice/Set/Set.vue'
import SpecialSetView from './components/Backoffice/Set/SpecialSet.vue'
import CardSetView from './components/Backoffice/Card/CardSet.vue'
import CardOnDeckView from './components/Backoffice/Card/CardOnDeck.vue'
import CardPendingView from './components/Backoffice/Card/CardPending.vue'
import InsideLogosView from './components/Backoffice/Logos/InsideLogos.vue'
import OutsideLogosView from './components/Backoffice/Logos/OutsideLogos.vue'

const routes = [
    { path: '/', component: LoginView },
    { path: '/register', component: RegisterView },
    { path: '/forgot', component: ForgotView },
    { path: '/backoffice/sets', component: SetView },
    { path: '/backoffice/special/sets', component: SpecialSetView },
    { path: '/backoffice/set/:id/cards', component: CardSetView },
    { path: '/backoffice/pending/cards', component: CardPendingView },
    { path: '/backoffice/playing/cards', component: CardOnDeckView },
    { path: '/backoffice/inside/logos', component: InsideLogosView },
    { path: '/backoffice/outside/logos', component: OutsideLogosView },
    { 
        path: '/:catchAll(.*)', 
        component: NotFoundView,
        name: 'NotFound'
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router