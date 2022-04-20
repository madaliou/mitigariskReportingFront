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
  addContributors ({ commit }, item) {
    return new Promise((resolve, reject) => {
      axios.post('propertiesNew/', item)
        .then((response) => {
          commit('ADD_CONTRIBUTORS', Object.assign(item, {id: response.data.id}))
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  fetchContributors ({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get('propertiesNew/')
        .then((response) => {
          commit('SET_CONTRIBUTORS', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },

  fetchContributorsByCountry ({ commit }, country) {
    return new Promise((resolve, reject) => {
      axios.post('contributor_filter/', { country })
        .then((response) => {
          commit('SET_CONTRIBUTORS_BY_COUNTRY', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },

  updateContributors ({ commit }, item) {
    return new Promise((resolve, reject) => {
      axios.put(`propertiesNew/${item.id}/`, item)
        .then((response) => {
          commit('UPDATE_CONTRIBUTORS', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  removeContributors ({ commit }, itemId) {
    return new Promise((resolve, reject) => {
      axios.delete(`propertiesNew/${itemId}`)
        .then((response) => {
          commit('REMOVE_CONTRIBUTORS', itemId)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  rate_update ({ commit }, item) {
    return new Promise((resolve, reject) => {
      axios.put(`rate-update/${item.id}/`, item)
        .then((response) => {
          commit('UPDATE_COMMISSION_RATE', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  pay_all_commission ({ commit }, itemId) {
    return new Promise((resolve, reject) => {
      axios.put(`pay-all-commission/${itemId}/`)
        .then((response) => {
          commit('UPDATE_PAY_ALL_COMMISSION', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  commissions_not_paid ({ commit }, itemId) {
    return new Promise((resolve, reject) => {
      axios.get(`commissions-not-paid/${itemId}/`)
        .then((response) => {
          commit('UPDATE_COMMISSIONS_NOT_PAID', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  }

}
