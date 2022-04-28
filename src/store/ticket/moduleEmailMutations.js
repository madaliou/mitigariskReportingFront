/*=========================================================================================
  File Name: moduleEmailMutations.js
  Description: Email Module Mutations
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default {
  SET_MAILS (state, mails) {
    state.mails = mails
  },
  SET_TAGS (state, tags) {
    state.mailTags = tags
  },
  SET_MESSAGES (state, messages) {
    state.messages = messages
  },

  TOGGLE_IS_MAIL_STARRED (state, payload) {
    state.mails.find((mail) => mail.id === payload.mailId).isStarred = payload.value
  }
}
