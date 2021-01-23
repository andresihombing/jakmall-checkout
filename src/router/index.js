import Vue from 'vue'
import Router from 'vue-router'
import Delivery from '@/components/Delivery'
import Payment from '@/components/Payment'
import Finish from '@/components/Finish'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: Delivery },
    { path: '/payment', component: Payment },
    { path: '/finish', component: Finish }
  ]
})
