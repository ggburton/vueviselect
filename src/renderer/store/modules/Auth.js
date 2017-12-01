
const state = {
  token: null,
  session_key: null
}

const getters = {
  getToken (state) {
    return state.token
  },
  getSessionKey (state) {
    return state.session_key
  }
}

const mutations = {
  SET_TOKEN (state, payload) {
    state.token = payload
  },
  SET_SESSION_KEY (state, payload) {
    state.session_key = payload
  }
}

const actions = {
  set_token ({ commit }, payload) {
    // do something async
    commit('SET_TOKEN', payload)
  },
  set_session_key ({ commit }, payload) {
    commit('SET_SESSION_KEY', payload)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
