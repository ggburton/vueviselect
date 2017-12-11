import Vue from 'vue'
import Router from 'vue-router'
import { requireAuth } from './routeguards'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: require('@/components/common/Login').default
    },
    {
      path: '/lockoutmacs',
      name: 'lockout-macs',
      beforeEnter: requireAuth,
      component: require('@/components/network/LockoutMacs').default
    },
    {
      path: '/lockoutform',
      name: 'lockout-form',
      component: require('@/components/network/LockoutMacForm').default
    },
    {
      path: '/network',
      name: 'network-page',
      beforeEnter: requireAuth,
      component: require('@/components/network/NetworkPage').default
    },
    {
      path: '/chat',
      name: 'chat',
      beforeEnter: requireAuth,
      component: require('@/components/chat/Chat').default
    },
    {
      path: '/spiceworks',
      name: 'spiceworks',
      component: require('@/components/spiceworks/SpiceworksLogin').default
    },
    {
      path: '/ticket/:id',
      name: 'ticket-detail',
      component: require('@/components/spiceworks/TicketDetail').default
    },
    {
      path: '/tickets',
      name: 'ticket',
      component: require('@/components/spiceworks/TicketList').default
    },
    {
      path: '/landing',
      name: 'landing-page',
      component: require('@/components/LandingPage').default
    },
    {
      path: '*',
      redirect: '/landing'
    }
  ]
})
