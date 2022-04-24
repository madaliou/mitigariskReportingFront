/*=========================================================================================
  File Name: moduleEmailActions.js
  Description: Email Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import axios from '@/axios.js'

export default {
  // Fetch emails
  fetchEmails ({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get('tickets/')
        .then((response) => {
          commit('SET_MAILS', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },

  // Fetch Tags
  fetchTags ({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get('/api/apps/email/tags')
        .then((response) => {
          commit('SET_TAGS', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  }

}