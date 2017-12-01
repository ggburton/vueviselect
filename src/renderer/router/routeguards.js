import store from '../store'

function requireAuth (to, from, next) {
  console.log('checking logged in')
  if ((store.getters.getToken === null) || (store.getters.getSessionKey === null)) {
    next({
      path: '/login'
    })
  } else {
    next()
  }
}

export { requireAuth }
