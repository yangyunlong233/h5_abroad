import { createRouter, createWebHashHistory } from 'vue-router'
import UsrDefault from '../views/Usr/UsrDefault'
import LoginDefault from '../views/Login/LoginDefault'

const routes = [
  {
    path: '/',
    name: 'UsrDefault',
    component: UsrDefault
  },
  {
    path: '/login',
    name: 'LoginDefault',
    component: LoginDefault
  },
  {
    path: '/d',
    name: 'UsrDValue',
    component: () => import('../views/Usr/UsrDValue.vue')
  },
  {
    path: '/dbro',
    name: 'UsrDValueBro',
    component: () => import('../views/Usr/UsrDValueBro.vue')
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('../views/NotFound/NotFound.vue')
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
