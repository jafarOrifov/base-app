import type { RouteRecordRaw } from 'vue-router'

export const products: RouteRecordRaw[] = [
  {
    path: '/products',
    name: 'products-section',
    component: () => import('@/layouts/MainPage.vue'),
    meta: {
      title: 'label.products',
      icon: 'mdi-invoice-list-outline',
    },
    children: [
      {
        path: '/products/product-categories',
        name: 'product-categories',
        component: () => import('@/pages/products/ProductCategoriesPage.vue'),
        meta: {
          title: 'title.productCategory',
          icon: 'mdi-shape-plus-outline',
          rules: ['show', 'add'],
        },
      },
      {
        path: '/products/characteristics',
        name: 'characteristics',
        component: () => import('@/pages/products/CharacteristicsPage.vue'),
        meta: {
          title: 'title.characteristics',
          icon: 'mdi-apple-keyboard-command',
          rules: ['show', 'add'],
        },
      },
      {
        path: '/products/product-groups',
        name: 'product-groups',
        component: () => import('@/pages/products/ProductGroupsPage.vue'),
        meta: {
          title: 'title.productGroups',
          icon: 'mdi-apple-keyboard-command',
          rules: ['show', 'add'],
        },
      },
    ],
  },
]
