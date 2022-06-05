/*=========================================================================================
  File Name: moduleTodoMutations.js
  Description: Todo Module Mutations
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default {
  SET_TASKS (state, tasks) {
    state.tasks = tasks
  },
  UPDATE_MESSAGE (state, task) {
    const taskIndex = state.tasks.findIndex((p) => p.id === task.id)
    Object.assign(state.tasks[taskIndex], task)
  }
}
