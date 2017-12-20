
const state = {
  token: null,
  session_key: null,
  server: 'localhost:8000'
}

const getters = {
  getToken (state) {
    return state.token
  },
  getSessionKey (state) {
    return state.session_key
  },
  getServer (state) {
    return state.server
  }
}

const mutations = {
  SET_TOKEN (state, payload) {
    state.token = payload
  },
  SET_SESSION_KEY (state, payload) {
    state.session_key = payload
  },
  SET_SERVER (state, payload) {
    state.server = payload
  }
}

const actions = {
  set_token ({ commit }, payload) {
    // do something async
    commit('SET_TOKEN', payload)
  },
  set_session_key ({ commit }, payload) {
    commit('SET_SESSION_KEY', payload)
  },
  set_server ({ commit }, payload) {
    commit('SET_BASE_URL', payload)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
