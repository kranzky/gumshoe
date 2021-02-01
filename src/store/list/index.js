import state from "./state"
import * as getters from "./getters"
import * as mutations from "./mutations"
import actions from "./actions"

export default (namespace) => {
  return {
    namespaced: true,
    state,
    getters,
    mutations,
    actions: actions(namespace)
  }
}
