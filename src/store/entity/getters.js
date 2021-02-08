export const showBadge = (state, getters, rootState, rootGetters) => {
  return !state.seen || rootGetters['entityItems/showBadge'] || rootGetters['entityChoices/showBadge']
}
