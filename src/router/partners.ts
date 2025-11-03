import type { RouteRecordRaw } from 'vue-router'

export const partners: RouteRecordRaw[] = [
  {
    path: '/partners',
    name: 'partners-section',
    component: () => import('@/layouts/MainPage.vue'),
    meta: {
      title: 'label.partners',
      icon: 'mdi-account-group-outline',
    },
    children: [
      {
        path: '/partners/partners',
        name: 'partners',
        component: () => import('@/pages/partners/PartnersPage.vue'),
        meta: {
          title: 'label.partners',
          icon: 'mdi-account-multiple-outline',
          rules: ['show', 'add'],
        },
      },
      {
        path: '/partners/partners-postion',
        name: 'partners-position',
        component: () => import('@/pages/partners/PartnersPasitionPage.vue'),
        meta: {
          title: 'title.partnersPosition',
          icon: 'mdi-account-hard-hat-outline',
          rules: ['show', 'add'],
        },
      },
      {
        path: '/settings/users',
        name: 'settings-users',
        component: () => import('@/pages/settings/UsersPage.vue'),
        meta: {
          title: 'title.users',
          icon: 'mdi-account-multiple-check-outline',
          rules: ['show', 'add'],
        },
      },
    ],
  },
]
