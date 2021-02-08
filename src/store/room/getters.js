export const showBadge = (state, getters, rootState, rootGetters) => {
  return !state.seen || rootGetters['roomItems/showBadge'] || rootGetters['roomChoices/showBadge']
}
