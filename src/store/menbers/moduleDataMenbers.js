import state from './moduleDataMenbersState'
import mutations from './moduleDataMenbersMutations'
import actions from './moduleDataMenbersActions'
import getters from './moduleDataMenbersGetters'

export default {
  isRegistered: false,
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
}
