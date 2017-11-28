const state = {
  schema: null
}

const getters = {
  getSchema (state) {
    return state.schema
  }
}

const mutations = {
  setSchema (state, payload) {
    state.schema = payload.schema
  }
}

const actions = {

}

export default {
  state,
  getters,
  mutations,
  actions
}
