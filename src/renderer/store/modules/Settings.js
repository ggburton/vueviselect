
const state = {
  silentNotifications: false
}

const getters = {
  getSilentNotifications (state) {
    return state.silentNotifications
  }
}

const mutations = {
  SET_SILENT_NOTIFICATIONS (state, payload) {
    state.silentNotifications = payload
  }
}

const actions = {
  set_silent_notifications ({ commit }, payload) {
    commit('SET_SILENT_NOTIFICATIONS', payload)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
