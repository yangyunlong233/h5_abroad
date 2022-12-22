import { createRouter, createWebHashHistory } from 'vue-router'
import LoginDefault from '../views/LoginDefault'

const routes = [
  {
    path: '/',
    name: 'LoginDefault',
    component: LoginDefault
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
