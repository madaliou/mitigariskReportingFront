/*=========================================================================================
  File Name: moduleTodoActions.js
  Description: Todo Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import axios from '@/axios.js'

export default {
  fetchMessage ({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get('replies/')
        .then((response) => {
          commit('SET_TASKS', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  }
}
