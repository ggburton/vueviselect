import coreapi from 'coreapi'
import store from '../store'

const client = new coreapi.Client()

let authclient = null

function corelogin (username, password) {
  getSchema().then(response => {
    const parms = {
      'username': username,
      'password': password
    }
    client.action(store.getters.getSchema, ['api-token-auth', 'create'], parms)
      .then(response => {
        let auth = new coreapi.auth.TokenAuthentication({
          scheme: 'JWT',
          token: response['token']
        })
        authclient = new coreapi.Client({auth: auth})
        store.dispatch('set_token', response['token'])
        getSchema().then(() => console.log('upgraded schema'))
      })
  })
}

function getSchema () {
  const server = store.getters.getServer
  let useclient = client
  if (store.getters.getToken !== null) {
    useclient = authclient
  }
  return new Promise((resolve, reject) => {
    useclient.get(`http://${server}/api/`)
      .then(data => {
        store.dispatch('set_schema', {schema: data})
        resolve()
      })
      .catch(err => {
        reject(err)
      })
  })
}

function useClient (action, parms = {}) {
  if (store.getters.getSchema === null) {
    getSchema().then()
  }
  console.log(authclient)
  const document = store.getters.getSchema
  return new Promise((resolve, reject) => {
    authclient.action(document, action, parms)
      .then(response => resolve(response))
      .catch(err => reject(err))
  })
}

export { getSchema, useClient, corelogin }
