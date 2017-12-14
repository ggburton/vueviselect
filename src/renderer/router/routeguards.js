import store from '../store'

function requireADAuth (to, from, next) {
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

function requireSpiceAuth (to, from, next) {
  console.log('spice auth guard called')
  if (store.getters.getSession_details.csrf_token === null) {
    console.log('calling login')
    next({
      path: '/spiceworksLogin',
      query: {
        redirect: to.fullPath
      }
    })
  } else {
    next()
  }
}

export { requireADAuth, requireSpiceAuth }
