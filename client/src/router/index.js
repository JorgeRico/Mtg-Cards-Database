import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: 'login',
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/pages/login/Login.vue'),
        meta: {
            layout: 'blank',
        },
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('@/pages/register/Register.vue'),
        meta: {
            layout: 'blank',
        },
    },
    {
        path: '/recover',
        name: 'recover',
        component: () => import('@/pages/recover/Recover.vue'),
        meta: {
            layout: 'blank',
        },
    },
    // {
    //   path: '/error-404',
    //   name: 'error-404',
    //   component: () => import('@/views/Error.vue'),
    //   meta: {
    //     layout: 'blank',
    //   },
    // },
    {
        path: '/setlist',
        name: 'setlist',
        component: () => import('@/pages/setList/SetList.vue'),
    },
    {
        path: '/setcards/:id',
        name: 'setcards',
        component: () => import('@/pages/setCards/SetCards.vue'),
    },
    {
        path: '/pendingCards',
        name: 'pendingCards',
        component: () => import('@/pages/pendingCards/PendingCards.vue'),
    },
    {
        path: '/cardsOnADeck',
        name: 'cardsOnADeck',
        component: () => import('@/pages/cardsOnADeck/CardsOnADeck.vue'),
    },
    {
        path: '/cardsBetterGraded',
        name: 'cardsBetterGraded',
        component: () => import('@/pages/cardsBetterGraded/CardsBetterGraded.vue'),
    },
    {
        path: '/printLogos',
        name: 'printLogos',
        component: () => import('@/pages/printLogos/PrintLogos.vue'),
    },
    {
        path: '/specialSets',
        name: 'specialSets',
        component: () => import('@/pages/specialSetsList/SpecialSetsList.vue'),
    },
    
    // {
    //   path: '*',
    //   redirect: 'error-404',
    // },
  ]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        ...setupLayouts(routes),
    ],
    scrollBehavior() {
        return { top: 0 }
    },
})
export default router
