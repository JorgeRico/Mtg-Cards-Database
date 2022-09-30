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
    path: '/case-6-anonimize',
    name: 'case-6-anonimize',
    component: () => import('@/views/pages/case6/Anonimize.vue'),
  },
  {
    path: '/case-6-tagger',
    name: 'case-6-tagger',
    component: () => import('@/views/pages/case6/Tagger.vue'),
  },
  {
    path: '/case-7',
    name: 'case-7',
    component: () => import('@/views/pages/case7/Case7.vue'),
  },
  {
    path: '/case-7/render',
    name: 'render',
    component: () => import('@/views/pages/case7/Render.vue'),
  },
  {
    path: '/case-8-alarm',
    name: 'case-8-alarm',
    component: () => import('@/views/pages/case8/Alarm.vue'),
  },
  {
    path: '/case-8-impact',
    name: 'case-8-impact',
    component: () => import('@/views/pages/case8/Impact.vue'),
  },
  {
    path: '/case-8-costs',
    name: 'case-8-costs',
    component: () => import('@/views/pages/case8/Costs.vue'),
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
