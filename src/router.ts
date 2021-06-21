import { createWebHistory, createRouter } from 'vue-router'

import Home from './components/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/dashboard/:vaultId',
    component: () => import(/* webpackChunkName="dashboard" */ './modules/dashboard/DashboardModule.vue'),
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName="dashboard" */ './modules/dashboard/views/Index.vue'),
      },
    ],
  },
  {
    path: '/todo/:vaultId',
    component: () => import(/* webpackChunkName="todo" */ './modules/todo/TodoModule.vue'),
    children: [
      {
        path: '',
        name: 'Todo',
        component: () => import(/* webpackChunkName="todo" */ './modules/todo/views/Index.vue'),
      },
    ],
  },
  {
    path: '/projects/:vaultId',
    component: () => import(/* webpackChunkName="project" */ './modules/project/ProjectModule.vue'),
    children: [
      {
        path: '',
        name: 'Project',
        component: () => import(/* webpackChunkName="project" */ './modules/project/views/Index.vue'),
      },
      {
        path: ':projectId',
        name: 'ProjectShow',
        component: () => import(/* webpackChunkName="project" */ './modules/project/views/Project.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
