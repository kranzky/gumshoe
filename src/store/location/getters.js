export const showBadge = (state, getters, rootState, rootGetters) => {
  return !state.seen || rootGetters['locationItems/showBadge'] || rootGetters['locationChoices/showBadge']
}
