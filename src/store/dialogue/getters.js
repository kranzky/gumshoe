export const showBadge = (state, getters, rootState, rootGetters) => {
  return !state.seen || rootGetters['dialogueItems/showBadge'] || rootGetters['dialogueChoices/showBadge']
}
