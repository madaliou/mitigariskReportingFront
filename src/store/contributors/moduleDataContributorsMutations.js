/*=========================================================================================
  File Name: moduleCalendarMutations.js
  Description: Calendar Module Mutations
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default {
  ADD_CONTRIBUTORS(state, item) {
    state.contributors.unshift(item)
  },
  SET_CONTRIBUTORS(state, contributors) {
    state.contributors = contributors
  },

  SET_CONTRIBUTORS_BY_COUNTRY(state, contributors) {
    state.contributors = contributors
  },

  UPDATE_CONTRIBUTORS(state, contributor) {
    const productIndex = state.contributors.findIndex((p) => p.id === contributor.id)
    Object.assign(state.contributors[productIndex], contributor)
  },

  UPDATE_COMMISSION_RATE(state, contributor) {
    const productIndex = state.contributors.findIndex((p) => p.id === contributor.id)
    Object.assign(state.contributors[productIndex], contributor)
  },

  UPDATE_PAY_ALL_COMMISSION(state, contributor) {
    const productIndex = state.contributors.findIndex((p) => p.id === contributor.id)
    Object.assign(state.contributors[productIndex], contributor)
  },

  UPDATE_COMMISSIONS_NOT_PAID(state, contributor) {
    const productIndex = state.contributors.findIndex((p) => p.id === contributor.id)
    Object.assign(state.contributors[productIndex], contributor)
  },
  REMOVE_CONTRIBUTORS(state, itemId) {
    const ItemIndex = state.contributors.findIndex((p) => p.id === itemId)
    state.contributors.splice(ItemIndex, 1)
  },
}
