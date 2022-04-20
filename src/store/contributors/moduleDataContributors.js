import state from './moduleDataContributorsState'
import mutations from './moduleDataContributorsMutations'
import actions from './moduleDataContributorsActions'
import getters from './moduleDataContributorsGetters'

export default {
  isRegistered: false,
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
}
