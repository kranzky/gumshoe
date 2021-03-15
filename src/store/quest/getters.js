export const showBadge = (state, getters, rootState, rootGetters) => {
  return !state.seen || rootGetters['entityItems/showBadge']
}

export const contentVisible = (state) => {
  return state.visible && !_.isNull(state.title)
}