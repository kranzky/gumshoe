export const showBadge = (state, getters, rootState, rootGetters) => {
  return !state.seen || rootGetters['roomItems/showBadge'] || rootGetters['roomChoices/showBadge']
}

export const contentVisible = (state) => {
  return state.visible && !_.isNull(state.id)
}