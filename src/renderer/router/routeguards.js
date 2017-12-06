import store from '../store'

function requireAuth (to, from, next) {
  if ((store.getters.getToken === null) || (store.getters.getSessionKey === null)) {
    next({
      path: '/login',
      query: {
        redirect: to.fullPath
      }
    })
  } else {
    next()
  }
}

export { requireAuth }
