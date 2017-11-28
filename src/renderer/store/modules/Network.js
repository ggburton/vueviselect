import Vue from 'vue'

const state = {
  network: {
    nodes: [],
    edges: []
  }
}

const getters = {
  getNetwork (state) {
    console.log('get network')
    return state.network
  }
}

const mutations = {
  APPEND_NODE (state, payload) {
    state.network.nodes.push(payload)
  },
  APPEND_EDGE (state, payload) {
    state.network.edges.push(payload)
  },
  UPDATE_NODE (state, payload) {
    const nodeIndex = state.network.nodes.findIndex(node => node.id === payload.id)
    if ((state.network.nodes[nodeIndex].group !== payload.group) || (state.network.nodes[nodeIndex].label !== payload.label)) {
      console.log('these two are not equal', state.network.nodes[nodeIndex], payload)
      Vue.set(state.network.nodes, nodeIndex, payload)
    }
  }
}

const actions = {
  append_node ({commit}, payload) {
    commit('APPEND_NODE', payload)
  },
  append_edge ({commit}, payload) {
    commit('APPEND_EDGE', payload)
  },
  update_node ({commit}, payload) {
    commit('UPDATE_NODE', payload)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
