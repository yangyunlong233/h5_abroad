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
    path: '/d', // D瓜
    name: 'UsrDValue',
    component: () => import('../views/Usr/UsrDValue.vue')
  },
  {
    path: '/d_bro', // 质押
    name: 'UsrDValueBro',
    component: () => import('../views/Usr/UsrDValueBro.vue')
  },
  {
    path: '/d_buy', // 回购
    name: 'UsrDValueBuy',
    component: () => import('../views/Usr/UsrDValueBuy.vue')
  },
  {
    path: '/d_force_buy', // 强制回购
    name: 'UsrDValueForceBuy',
    component: () => import('../views/Usr/UsrDValueForceBuy.vue')
  },
  {
    path: '/d_logs', // 账单
    name: 'UsrDValueLogs',
    component: () => import('../views/Usr/UsrDValueLogs.vue')
  },
  {
    path: '/d_bro_logs', // 贷款记录
    name: 'UsrDValueBroLogs',
    component: () => import('../views/Usr/UsrDValueBroLogs.vue')
  },
  {
    path: '/d_buy_logs', // 回购记录
    name: 'UsrDValueBuyLogs',
    component: () => import('../views/Usr/UsrDValueBuyLogs.vue')
  },
  {
    path: '/set_trade_pwd', // 设置安全密码
    name: 'SetTradePwd',
    component: () => import('../views/Usr/SetTradePwd.vue')
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
