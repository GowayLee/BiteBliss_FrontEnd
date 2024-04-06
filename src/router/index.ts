import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/ballot',
      name: 'ballot',
      component: () => import('@/views/BallotView.vue')
    },
    {
      path: '/shops',
      name: 'shops',
      component: () => import('@/views/ShopView.vue')
    },
  ]
})

export default router
