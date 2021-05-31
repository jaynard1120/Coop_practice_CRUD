import axios from 'axios'

const state = {
  data: [],
}

const getters = {
  allItems: states => states.data,
}

const actions = {
  async fetchLoanRequest({ commit }) {
    const response = await axios.get('/loans')
    commit('setLoans', response.data)
  },
  async addRequest({ commit }, requestData) {
    const response = await axios.post('/loan', requestData)
    commit('newRequest', response.data)
  },
  async deleteRequest({ commit }, id) {
    await axios.delete(`/loan/${id}`)
    commit('deleteLoan', id)
  },
  async editLoanRequest({ commit }, loanDetails) {
    await axios.put(`/loan/${loanDetails.id}`, loanDetails)
    commit('editLoan', loanDetails)
  },
}

const mutations = {
  setLoans(stateLoan, loans) {
    stateLoan.data = loans
  },
  newRequest(stateRequest, request) {
    stateRequest.data = request
  },
  deleteLoan(deleteState, loanId) {
    const index = deleteState.data.findIndex(loan => loan.id === loanId)
    deleteState.data.splice(index, 1)
  },
  editLoan(editState, data) {
    const loanIndex = editState.data.findIndex(loan => loan.id === data.id)
    editState.data[loanIndex].purpose = data.purpose
    editState.data[loanIndex].amount = data.amount
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
