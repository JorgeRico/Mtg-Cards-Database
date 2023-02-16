import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'login',
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/dashboard/Dashboard.vue'),
  },
  {
    path: '/account-settings',
    name: 'pages-account-settings',
    component: () => import('@/views/pages/account-settings/AccountSettings.vue'),
  },
  {
    path: '/login',
    name: 'pages-login',
    component: () => import('@/views/pages/Login.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/register',
    name: 'pages-register',
    component: () => import('@/views/pages/Register.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/recover',
    name: 'recover',
    component: () => import('@/views/pages/Recover.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/error-404',
    name: 'error-404',
    component: () => import('@/views/Error.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/setlist',
    name: 'setlist',
    component: () => import('@/views/pages/setList/SetList.vue'),
  },
  {
    path: '/setcards/:id',
    name: 'setcards',
    component: () => import('@/views/pages/setCards/SetCards.vue'),
  },
  {
    path: '/pendingCards',
    name: 'pendingCards',
    component: () => import('@/views/pages/pendingCards/PendingCards.vue'),
  },
  {
    path: '/cardsOnADeck',
    name: 'cardsOnADeck',
    component: () => import('@/views/pages/cardsOnADeck/CardsOnADeck.vue'),
  },
  {
    path: '/printLogos',
    name: 'printLogos',
    component: () => import('@/views/pages/printLogos/PrintLogos.vue'),
  },
  {
    path: '/specialSets',
    name: 'specialSets',
    component: () => import('@/views/pages/specialSetsList/SpecialSetsList.vue'),
  },
  
  // {
  //   path: '*',
  //   redirect: 'error-404',
  // },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
