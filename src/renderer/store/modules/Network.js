const state = {
  nodes: [],
  edges: []
}

const mutations = {
  appendNode (state, payload) {
    state.nodes.push(payload.node)
  }
}

const actions = {

}

export default {
  state,
  mutations,
  actions
}
