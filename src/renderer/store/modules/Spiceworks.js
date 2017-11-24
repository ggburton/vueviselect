const state = {
  session_details: {
    csrf_token: null,
    user_id: null
  },
  worktimer: false,
  ticketTimer: {
    ticket: null,
    starttime: null
  }
}

const getters = {
  worktimer (state) {
    return state.ticketTimer.worktimer
  },
  session_details (state) {
    return state.session_details
  }
}

const mutations = {
  SET_SESSION_DETAILS (state, payload) {
    state.session_details.csrf_token = payload.csrf_token
    state.session_details.user_id = payload.user_id
  },
  START_WORK_TIMER (state, payload) {
    state.worktimer = !state.worktimer
    state.ticketTimer.ticket = payload.ticket
    state.ticketTimer.starttime = payload.startTime
  },
  STOP_WORK_TIMER (state) {
    state.worktimer = false
    state.ticketTimer.ticket = null
    state.ticketTimer.starttime = null
  }
}

const actions = {
  set_session_details ({commit}, payload) {
    commit('SET_SESSION_DETAILS', payload)
  },

  work_on_ticket ({commit}, payload) {
    commit('START_WORK_TIMER', payload)
  },

  stop_work_on_ticket ({commit}) {
    commit('STOP_WORK_TIMER')
  }

}

export default {
  state,
  getters,
  mutations,
  actions
}
