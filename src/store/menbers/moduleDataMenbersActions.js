/*=========================================================================================
  File Name: moduleCalendarActions.js
  Description: Calendar Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import axios from '@/axios.js'

export default {
  addMenbers ({ commit }, item) {
    return new Promise((resolve, reject) => {
      axios.post('membershipFees/', item)
        .then((response) => {
          commit('ADD_MENBERS', Object.assign(item, {id: response.data.id}))
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  fetchMenbers ({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get('membershipFees/')
        .then((response) => {
          commit('SET_MENBERS', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },

  updateMenbers ({ commit }, item) {
    return new Promise((resolve, reject) => {
      axios.put(`membershipFees/${item.id}/`, item)
        .then((response) => {
          commit('UPDATE_MENBERS', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  removeMenbers ({ commit }, itemId) {
    return new Promise((resolve, reject) => {
      axios.delete(`membershipFees/${itemId}`)
        .then((response) => {
          commit('REMOVE_MENBERS', itemId)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  }


}
