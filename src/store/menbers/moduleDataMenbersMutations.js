/*=========================================================================================
  File Name: moduleCalendarMutations.js
  Description: Calendar Module Mutations
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default {
  ADD_MENBERS(state, item) {
    state.menbers.unshift(item)
  },

  SET_MENBERS(state, menbers) {
    state.menbers = menbers
  },

  UPDATE_MENBERS(state, menbers) {
    const productIndex = state.menbers.findIndex((p) => p.id === menbers.id)
    Object.assign(state.menbers[productIndex], menbers)
  },

  REMOVE_MENBERS(state, itemId) {
    const ItemIndex = state.menbers.findIndex((p) => p.id === itemId)
    state.menbers.splice(ItemIndex, 1)
  },
}
