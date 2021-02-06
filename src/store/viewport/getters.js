export const showBadge = (state, getters, rootState, rootGetters) => {
  return !state.seen || rootGetters['viewportItems/showBadge'] || rootGetters['viewportChoices/showBadge']
}
