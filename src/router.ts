import { createWebHistory, createRouter } from 'vue-router'

import Home from './components/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },

  {
    path: '/dashboard/:userId/:vaultId',
    component: () => import(/* webpackChunkName="dashboard" */ './modules/dashboard/DashboardModule.vue'),
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName="dashboard" */ './modules/dashboard/views/Index.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
