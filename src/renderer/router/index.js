import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/lockoutmacs',
      name: 'lockout-macs',
      component: require('@/components/network/LockoutMacs').default
    },
    {
      path: '/network',
      name: 'landing-page',
      component: require('@/components/LandingPage').default
    },
    {
      path: '/chat',
      name: 'chat',
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
      path: '/ticket',
      name: 'ticket',
      component: require('@/components/spiceworks/TicketList').default
    },
    {
      path: '*',
      redirect: '/chat'
    }
  ]
})
