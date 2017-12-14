import Vue from 'vue'
import Router from 'vue-router'
import { requireADAuth, requireSpiceAuth } from './routeguards'

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
      beforeEnter: requireADAuth,
      component: require('@/components/network/LockoutMacs').default
    },
    {
      path: '/lockoutform',
      name: 'lockout-form',
      beforeEnter: requireADAuth,
      component: require('@/components/network/LockoutMacForm').default
    },
    {
      path: '/network',
      name: 'network-page',
      beforeEnter: requireADAuth,
      component: require('@/components/network/NetworkPage').default
    },
    {
      path: '/chat',
      name: 'chat',
      beforeEnter: requireADAuth,
      component: require('@/components/chat/Chat').default
    },
    {
      path: '/spiceworksLogin',
      name: 'spiceworksLogin',
      component: require('@/components/spiceworks/SpiceworksLogin').default
    },
    {
      path: '/ticket/:id',
      name: 'ticket-detail',
      beforeEnter: requireSpiceAuth,
      component: require('@/components/spiceworks/TicketDetail').default
    },
    {
      path: '/tickets',
      name: 'ticket',
      beforeEnter: requireSpiceAuth,
      component: require('@/components/spiceworks/TicketList').default
    },
    {
      path: '/landing',
      name: 'landing-page',
      component: require('@/components/common/LandingPage').default
    },
    {
      path: '*',
      redirect: '/landing'
    }
  ]
})
