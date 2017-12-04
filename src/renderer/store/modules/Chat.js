const state = {
  active_users: null,
  messages: []
}

const getters = {
  getActiveUsers (state) {
    return state.active_users
  },
  getMessages (state) {
    return state.messages
  }
}

const mutations = {
  SET_ACTIVE_USERS (state, payload) {
    state.active_users = payload
  },
  APPEND_MESSAGE (state, payload) {
    console.log('appending message')
    state.messages.push(payload)
  }
}

const actions = {
  set_active_users ({commit}, payload) {
    commit('SET_ACTIVE_USERS', payload)
  },
  append_message ({commit}, payload) {
    commit('APPEND_MESSAGE', payload)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
