import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import AccountList from '../Accounts/AccountList.vue'
import AccountDetail from '../Accounts/AccountDetail.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/account",
  },
  {
    path: '/account',
    name: 'account',
    component: AccountList
  },
  {
    path: '/account/:accountId',
    name: 'account-detail',
    component: AccountDetail
  },
  {
    path: '/account/dashboard',
    name: 'Performance-Dashboard',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../Dashboard/Performance-Dashboard.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
