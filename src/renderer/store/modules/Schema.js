
const state = {
  schema: null
}

const getters = {
  getSchema (state) {
    return state.schema
  }
}

const mutations = {
  SET_SCHEMA (state, payload) {
    state.schema = payload.schema
  }
}

const actions = {
  set_schema (context, payload) {
    context.commit('SET_SCHEMA', payload)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
