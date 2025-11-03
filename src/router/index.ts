import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { warningMessage } from '@/composables/useNotify'
import i18n from '@/plugins/i18n'
import { products } from './products'
import { partners } from './partners'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/layouts/MainPage.vue'),
    meta: {
      title: 'title.dashboard',
    },
    children: [
      {
        path: '/',
        name: 'title.dashboard',
        component: () => import('@/pages/HomeView.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/LoginPage.vue'),
  },
  {
    path: '/:catchAll(.*)*',
    name: 'ErrorPage',
    component: () => import('@/layouts/ErrorPage.vue'),
  },
  ...products,
  ...partners,
]

export const menus = routes.filter((menu) => {
  return menu.name !== 'login' && menu.name !== 'home' && menu.name !== 'ErrorPage'
})

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  if (!token) {
    if (to.path !== '/login') {
      next('/login')
      warningMessage(i18n.global.t('label.requiresAuth'))
    } else {
      next()
    }
  } else if (to.path === '/login' && token) {
    next('/')
  } else {
    next()
  }
})

export default router
